import { VariableDefinition } from '../custom-header-format/variable-definition/variable-definition'
import { RequestContext } from '../insomnia/types/request-context'

export const pluginGlobal: {
  currentRequestVariableDefinitions: VariableDefinition[]
  currentRequestContext: RequestContext | null
} = {
  currentRequestVariableDefinitions: [],
  currentRequestContext: null,
}
