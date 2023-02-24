import { RequestHookContext } from '../insomnia/types/request-hook-context'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'
import { ValueSource } from './value-source'

export const valueSourceResponseCode: ValueSource = {
  type: 'responseCode',
  displayName: 'Response Status Code',
  canBeExtracted: false,
  extract: async (
    _argValue: string,
    _request: RequestHookContext,
    response: ResponseHookContext,
  ): Promise<string | null | undefined> => {
    return `${response.response.getStatusCode()}`
  },
}
