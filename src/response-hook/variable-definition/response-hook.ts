import { VariableDefinition } from '../../custom-header-format/variable-definition/variable-definition'
import { ResponseHook } from '../../insomnia/types/response-hook'
import { ResponseHookContext } from '../../insomnia/types/response-hook-context'
import { allValueExtractors } from '../../value-extractors/all-value-extractors'
import { getVariableKey } from '../../variable-key'

export const variableSavingResponseHook: ResponseHook = async (context: ResponseHookContext) => {
  const serializedDefinitions = await context.store.getItem('variableDefinitions')
  await context.store.removeItem('variableDefinitions')
  if (serializedDefinitions) {
    try {
      const definitions = JSON.parse(serializedDefinitions) as VariableDefinition[]
      const promises = definitions.map(async def => saveVariable(def, context))
      await Promise.all(promises)
    } catch (e) {
      console.log('Save Variables Plugin Definition Response Hook Error', e)
    }
  }
}

async function saveVariable(def: VariableDefinition, context: ResponseHookContext): Promise<void> {
  const extractor = allValueExtractors.find(v => v.type === def.attribute)
  if (!extractor) throw new Error(`Could not find value extractor for variable ${def.variableName}`)

  const value = await extractor.extractFromResponse(def, context)
  if (value !== undefined) {
    const result = value === null ? null : value.toString()
    const key = getVariableKey(def.workspaceId, def.variableName)
    await context.store.setItem(key, result)
  }
}
