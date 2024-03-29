import { RequestHookContext } from '../insomnia/types/request-hook-context'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'
import { ValueSource } from './value-source'

export const valueSourceStatic: ValueSource = {
  type: 'static',
  displayName: 'Static Value',
  canBeExtracted: false,
  argumentName: 'Value',
  extract: async (
    argValue: string,
    _request: RequestHookContext,
    _response: ResponseHookContext,
  ): Promise<string | null | undefined> => {
    return argValue
  },
}
