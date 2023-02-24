import { ResponseHookContext } from '../insomnia/types/response-hook-context'
import { ValueSource } from './value-source'

export const valueSourceStatic: ValueSource = {
  type: 'static',
  displayName: 'Static Value',
  canBeExtracted: false,
  argumentName: 'Value',
  extractFromResponse: async (argValue: string, _context: ResponseHookContext): Promise<string | null | undefined> => {
    return argValue
  },
}
