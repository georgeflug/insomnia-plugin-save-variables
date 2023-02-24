import { VariableDefinition } from '../custom-header-format/variable-definition/variable-definition'
import { RequestHookContext } from '../insomnia/types/request-hook-context'

export const pluginGlobal: {
  currentRequestVariableDefinitions: VariableDefinition[]
  currentRequestContext: RequestHookContext | null
} = {
  currentRequestVariableDefinitions: [],
  currentRequestContext: null,
}
