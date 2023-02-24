import { VariableDefinition } from '../custom-header-format/variable-definition/variable-definition'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'
import { ValueSource } from './value-source'

export const valueSourceStatic: ValueSource = {
  type: 'static',
  displayName: 'Static Value',
  canBeExtracted: false,
  argumentName: 'Value',
  extractFromResponse: async (
    variableDefinition: VariableDefinition,
    _context: ResponseHookContext,
  ): Promise<string | null | undefined> => {
    return variableDefinition.sourceArg
  },
}
