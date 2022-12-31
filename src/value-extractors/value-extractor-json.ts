import { JSONPath } from 'jsonpath-plus'
import { VariableDefinition } from '../custom-header-format/variable-definition/variable-definition'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'
import { ValueExtractor } from './value-extractor'

export const valueExtractorJson: ValueExtractor = {
  type: 'bodyJson',
  display: {
    name: 'Body Attribute',
    description: 'value of response body',
    argument: 'Response JSON Path',
  },
  extractFromResponse: async (
    variableDefinition: VariableDefinition,
    context: ResponseHookContext,
  ): Promise<string | null | undefined> => {
    const response = JSON.parse((context.response.getBody() || '').toString())
    return JSONPath<string>({
      path: variableDefinition.arg,
      json: response,
      wrap: false,
    })
  },
}
