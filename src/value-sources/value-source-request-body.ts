import { RequestHookContext } from '../insomnia/types/request-hook-context'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'
import { ValueSource } from './value-source'

export const valueSourceRequestBody: ValueSource = {
  type: 'requestBody',
  displayName: 'Request Body',
  canBeExtracted: true,
  extract: async (
    _argValue: string,
    request: RequestHookContext,
    _response: ResponseHookContext,
  ): Promise<string | null | undefined> => {
    return request.request.getBodyText() || ''
  },
}
