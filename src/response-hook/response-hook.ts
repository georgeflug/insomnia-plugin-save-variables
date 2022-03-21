import { JSONPath } from 'jsonpath-plus'
import { VariableDefinition } from '../custom-header-format/variable-definition'
import { ResponseHook } from '../insomnia/types/response-hook'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'

export const variableSavingResponseHook: ResponseHook = async (context: ResponseHookContext) => {
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
  response: string,
  context: ResponseHookContext,
) {
  const promises = definitions.map(async def => {
    const value = getValueFromResponse(response, def, context)
    if (value !== undefined) {
      const result = value === null ? null : value.toString()
      await context.store.setItem(`variable-${def.variableName}`, result)
    }
  })
  await Promise.all(promises)
}

function getValueFromResponse(
  response: string,
  definition: VariableDefinition,
  context: ResponseHookContext,
): string | undefined | null {
  if (definition.attribute === 'body') {
    return JSONPath<string>({
      path: definition.path,
      json: response,
      wrap: false,
    })
  } else {
    if (!context.response.hasHeader(definition.path)) {
      return undefined
    }
    const header = context.response.getHeader(definition.path)
    if (Array.isArray(header)) {
      return header[0]
    } else {
      return header
    }
  }
}
