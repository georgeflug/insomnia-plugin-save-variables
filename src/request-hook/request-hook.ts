import {
  isVariableDefinitionHeader,
  parseVariableDefinitionHeader,
} from '../custom-header-format/variable-definition/variable-definition'
import { RequestHook } from '../insomnia/types/request-hook'
import { RequestHookContext } from '../insomnia/types/request-hook-context'

export const variableDeclarationHeaderRequestHook: RequestHook = async (context: RequestHookContext) => {
  const headers = context.request.getHeaders()
  const customHeaderNames = headers.map(header => header.name).filter(isVariableDefinitionHeader)
  customHeaderNames.forEach(name => context.request.removeHeader(name))
  const variableDefinitions = customHeaderNames.map(parseVariableDefinitionHeader)
  await context.store.setItem('variableDefinitions', JSON.stringify(variableDefinitions))
}
