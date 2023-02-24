import { RequestHookContext } from '../insomnia/types/request-hook-context'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'
import { ValueSource } from './value-source'

export const valueSourceRequestHeader: ValueSource = {
  type: 'requestHeader',
  displayName: 'Request Header',
  argumentName: 'Header Name',
  canBeExtracted: false,
  extract: async (
    argValue: string,
    request: RequestHookContext,
    _response: ResponseHookContext,
  ): Promise<string | null | undefined> => {
    const header = request.request.getHeader(argValue ?? '')
    if (Array.isArray(header)) {
      return header[0]
    } else {
      return header
    }
  },
}
