import jsonpath from 'jsonpath'
import { VariableDefinition } from '../custom-header-format/variable-definition'

export const variableSavingResponseHook: Insomnia.ResponseHook = async (context: Insomnia.ResponseHookContext) => {
  const serializedDefinitions = await context.store.getItem('variableDefinitions')
  await context.store.removeItem('variableDefinitions')
  if (serializedDefinitions) {
    const definitions = JSON.parse(serializedDefinitions) as VariableDefinition[]
    const response = JSON.parse((context.response.getBody() || '').toString())
    await extractVariablesFromResponse(definitions, response, context)
  }
}

async function extractVariablesFromResponse(
  definitions: VariableDefinition[],
  response: unknown,
  context: Insomnia.ResponseHookContext,
) {
  const promises = definitions.map(async def => {
    const value = jsonpath.query(response, def.jsonPath)
    await context.store.setItem(`variable-${def.variableName}`, value.toString())
  })
  await Promise.all(promises)
}
