import { JSONPath } from 'jsonpath-plus'
import { VariableDefinition } from '../custom-header-format/variable-definition/variable-definition'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'
import { ValueExtractor } from './value-extractor'

export const valueExtractorJson: ValueExtractor = {
  type: 'bodyJson',
  display: 'JSON',
  extractFromResponse: async (
    variableDefinition: VariableDefinition,
    context: ResponseHookContext,
  ): Promise<string | null | undefined> => {
    const response = JSON.parse((context.response.getBody() || '').toString())
    return JSONPath<string>({
      path: variableDefinition.path,
      json: response,
      wrap: false,
    })
  },
}
