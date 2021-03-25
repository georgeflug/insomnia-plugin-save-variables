import jsonpath from 'jsonpath'
import { VariableDefinition } from '../custom-header-format/variable-definition'

export const variableSavingResponseHook: Insomnia.ResponseHook = async (context: Insomnia.ResponseHookContext) => {
  const serializedDefinitions = await context.store.getItem('variableDefinitions')
  await context.store.removeItem('variableDefinitions')
  if (serializedDefinitions) {
    try {
      const definitions = JSON.parse(serializedDefinitions) as VariableDefinition[]
      const response = JSON.parse((context.response.getBody() || '').toString())
      await extractVariablesFromResponse(definitions, response, context)
    } catch (e) {
      console.log('Save Variables Plugin Response Hook Error', e)
    }
  }
}

async function extractVariablesFromResponse(
  definitions: VariableDefinition[],
  response: unknown,
  context: Insomnia.ResponseHookContext,
) {
  const promises = definitions.map(async def => {
    const value = jsonpath.value(response, def.jsonPath)
    if (value !== undefined) {
      const result = value === null ? null : value.toString()
      await context.store.setItem(`variable-${def.variableName}`, result)
    }
  })
  await Promise.all(promises)
}
