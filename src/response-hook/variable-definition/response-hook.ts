import { VariableDefinition } from '../../custom-header-format/variable-definition/variable-definition'
import { pluginGlobal } from '../../global/plugin-global'
import { RequestHookContext } from '../../insomnia/types/request-hook-context'
import { ResponseHook } from '../../insomnia/types/response-hook'
import { ResponseHookContext } from '../../insomnia/types/response-hook-context'
import { log, LogLevel } from '../../logger/log'
import { allValueExtractors } from '../../value-extractors/all-value-extractors'
import { allValueSources } from '../../value-sources/all-value-sources'
import { getVariableKey } from '../../variable-key'

export const variableSavingResponseHook: ResponseHook = async (context: ResponseHookContext) => {
  const definitions = pluginGlobal.currentRequestVariableDefinitions
  const request = pluginGlobal.currentRequestContext
  if (definitions?.length && request) {
    try {
      pluginGlobal.currentRequestVariableDefinitions = []
      pluginGlobal.currentRequestContext = null

      const promises = definitions.map(async def => saveVariable(def, request, context))
      await Promise.all(promises)
    } catch (e) {
      log(LogLevel.ERROR, 'Variable Definition Response Hook Error', e)
    }
  }
}

async function saveVariable(
  def: VariableDefinition,
  request: RequestHookContext,
  context: ResponseHookContext,
): Promise<void> {
  const source = allValueSources.find(v => v.type === def.source)
  if (!source) throw new Error(`Could not find source for variable ${def.variableName}`)

  let value = await source?.extract(def.sourceArg ?? '', request, context)

  if (source.canBeExtracted && value != null) {
    const extractor = allValueExtractors.find(v => v.type === def.extractor)
    if (!extractor) throw new Error(`Could not find value extractor for variable ${def.variableName}`)
    value = await extractor.extract(value, def.extractorArg ?? '')
  }

  if (value !== undefined) {
    const result = value === null ? null : value.toString()
    const key = getVariableKey(def.workspaceId, def.variableName)
    await context.store.setItem(key, result)
  }
}
