import { RequestHookContext } from '../insomnia/types/request-hook-context'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'
import { ValueSource } from './value-source'

export const valueSourceResponseHeader: ValueSource = {
  type: 'responseHeader',
  displayName: 'Response Header',
  canBeExtracted: false,
  argumentName: 'Header Name',
  extract: async (
    argValue: string,
    _request: RequestHookContext,
    response: ResponseHookContext,
  ): Promise<string | null | undefined> => {
    const header = response.response.getHeader(argValue ?? '')
    if (Array.isArray(header)) {
      return header[0]
    } else {
      return header
    }
  },
}
