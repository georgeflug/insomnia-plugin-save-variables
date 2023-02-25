import { DeletionDefinition } from '../../custom-header-format/deletion/deletion'
import { ResponseHook } from '../../insomnia/types/response-hook'
import { ResponseHookContext } from '../../insomnia/types/response-hook-context'
import { log, LogLevel } from '../../logger/log'
import { getVariableKey } from '../../variable-key'

export const deletionResponseHook: ResponseHook = async (context: ResponseHookContext) => {
  const serializedDefinitions = await context.store.getItem('variableDeletions')
  await context.store.removeItem('variableDeletions')
  if (serializedDefinitions) {
    try {
      const definitions = JSON.parse(serializedDefinitions) as DeletionDefinition[]
      const statusCode = context.response.getStatusCode()
      await deleteVariables(definitions, statusCode, context)
    } catch (e) {
      log(LogLevel.ERROR, 'Deletion Response Hook Error', e)
    }
  }
}

async function deleteVariables(definitions: DeletionDefinition[], statusCode: number, context: ResponseHookContext) {
  const promises = definitions.map(async def => {
    const regex = def.statusCodeMatcher ? new RegExp(def.statusCodeMatcher) : /.+/
    if (regex.test(statusCode + '')) {
      const storeItemName = getVariableKey(def.workspaceId, def.variableName)
      await context.store.removeItem(storeItemName)
      log(LogLevel.INFO, `Deleted Variable: ${def.variableName}`)
    } else {
      log(LogLevel.INFO, `Variable "${def.variableName}" not deleted because status code did not match filter`)
    }
  })
  await Promise.all(promises)
}
