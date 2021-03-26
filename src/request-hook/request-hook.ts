import { isCustomHeader, parseCustomHeader } from '../custom-header-format/custom-header-format'
import { RequestHook } from '../insomnia/types/request-hook'
import { RequestHookContext } from '../insomnia/types/request-hook-context'

export const variableDeclarationHeaderRequestHook: RequestHook = async (context: RequestHookContext) => {
  const headers = context.request.getHeaders()
  const customHeaderNames = headers.map(header => header.name).filter(isCustomHeader)
  customHeaderNames.forEach(name => context.request.removeHeader(name))
  const variableDefinitions = customHeaderNames.map(parseCustomHeader)
  await context.store.setItem('variableDefinitions', JSON.stringify(variableDefinitions))
}
