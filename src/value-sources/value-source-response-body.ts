import { VariableDefinition } from '../custom-header-format/variable-definition/variable-definition'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'
import { ValueSource } from './value-source'

export const valueSourceResponseBody: ValueSource = {
  type: 'responseBody',
  displayName: 'Response Body',
  extractFromResponse: async (
    _variableDefinition: VariableDefinition,
    context: ResponseHookContext,
  ): Promise<string | null | undefined> => {
    return context.response.getBody()?.toString('utf-8') || ''
  },
}
