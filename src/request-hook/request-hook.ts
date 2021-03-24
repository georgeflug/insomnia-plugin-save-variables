import { isCustomHeader, parseCustomHeader } from '../custom-header-format/custom-header-format'

export const variableDeclarationHeaderRequestHook: Insomnia.RequestHook = async (
  context: Insomnia.RequestHookContext,
) => {
  const headers = context.request.getHeaders()
  const customHeaderNames = headers.map(header => header.name).filter(isCustomHeader)
  customHeaderNames.forEach(name => context.request.removeHeader(name))
  const variableDefinitions = customHeaderNames.map(parseCustomHeader)
  await context.store.setItem('variableDefinitions', JSON.stringify(variableDefinitions))
}
