import { RequestHookContext } from '../insomnia/types/request-hook-context'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'
import { ValueSource } from './value-source'

export const valueSourceResponseBody: ValueSource = {
  type: 'responseBody',
  displayName: 'Response Body',
  canBeExtracted: true,
  extract: async (
    _argValue: string,
    _request: RequestHookContext,
    response: ResponseHookContext,
  ): Promise<string | null | undefined> => {
    return response.response.getBody()?.toString('utf-8') || ''
  },
}
