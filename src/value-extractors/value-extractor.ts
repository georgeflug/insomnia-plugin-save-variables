import { VariableDefinition } from '../custom-header-format/variable-definition/variable-definition'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'

export interface ValueExtractor {
  type: string
  display: string
  // todo: extractBefore: (variableDefinition: VariableDefinition, context: RequestHookContext) => Promise<string>
  extractFromResponse: (
    variableDefinition: VariableDefinition,
    context: ResponseHookContext,
  ) => Promise<string | null | undefined>
}
