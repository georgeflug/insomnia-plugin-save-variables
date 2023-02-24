import { RequestHookContext } from '../insomnia/types/request-hook-context'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'

export interface ValueSource {
  type: string
  displayName: string
  canBeExtracted: boolean
  argumentName?: string
  // todo: extractBefore: (variableDefinition: VariableDefinition, context: RequestHookContext) => Promise<string>
  extract: (
    argValue: string,
    request: RequestHookContext,
    response: ResponseHookContext,
  ) => Promise<string | null | undefined>
}
