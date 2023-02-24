import { VariableDefinition } from '../custom-header-format/variable-definition/variable-definition'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'

export interface ValueSource {
  type: string
  displayName: string
  canBeExtracted: boolean
  argumentName?: string
  // todo: extractBefore: (variableDefinition: VariableDefinition, context: RequestHookContext) => Promise<string>
  extractFromResponse: (
    variableDefinition: VariableDefinition,
    context: ResponseHookContext,
  ) => Promise<string | null | undefined>
}
