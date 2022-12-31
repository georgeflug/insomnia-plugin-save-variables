import { VariableDefinition } from '../custom-header-format/variable-definition/variable-definition'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'
import { ValueExtractor } from './value-extractor'

export const valueExtractorHeader: ValueExtractor = {
  type: 'header',
  display: 'Header',
  extractFromResponse: async (
    variableDefinition: VariableDefinition,
    context: ResponseHookContext,
  ): Promise<string | null | undefined> => {
    const header = context.response.getHeader(variableDefinition.path)
    if (Array.isArray(header)) {
      return header[0]
    } else {
      return header
    }
  },
}
