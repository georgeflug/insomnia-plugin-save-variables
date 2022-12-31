import { VariableDefinition } from '../custom-header-format/variable-definition/variable-definition'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'
import { ValueExtractor } from './value-extractor'

export const valueExtractorStatic: ValueExtractor = {
  type: 'static',
  display: {
    name: 'Static Value',
    description: 'save a static value',
    argument: 'Value',
  },
  extractFromResponse: async (
    variableDefinition: VariableDefinition,
    _context: ResponseHookContext,
  ): Promise<string | null | undefined> => {
    return variableDefinition.arg
  },
}
