import { ResponseHookContext } from '../insomnia/types/response-hook-context'
import { ValueSource } from './value-source'

export const valueSourceResponseBody: ValueSource = {
  type: 'responseBody',
  displayName: 'Response Body',
  canBeExtracted: true,
  extractFromResponse: async (_argValue: string, context: ResponseHookContext): Promise<string | null | undefined> => {
    return context.response.getBody()?.toString('utf-8') || ''
  },
}
