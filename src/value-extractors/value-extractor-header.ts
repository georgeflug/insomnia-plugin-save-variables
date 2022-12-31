import { VariableDefinition } from '../custom-header-format/variable-definition/variable-definition'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'
import { ValueExtractor } from './value-extractor'

export const valueExtractorHeader: ValueExtractor = {
  type: 'header',
  display: {
    name: 'Header',
    description: 'value of response header',
    argument: 'Header Name',
  },
  extractFromResponse: async (
    variableDefinition: VariableDefinition,
    context: ResponseHookContext,
  ): Promise<string | null | undefined> => {
    const header = context.response.getHeader(variableDefinition.arg)
    if (Array.isArray(header)) {
      return header[0]
    } else {
      return header
    }
  },
}
