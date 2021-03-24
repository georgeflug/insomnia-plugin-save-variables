import { isCustomHeader, parseCustomHeader } from '../custom-header-format/custom-header-format'

export const variableDeclarationHeaderRequestHook: Insomnia.RequestHook = async (
  context: Insomnia.RequestHookContext,
) => {
  const headers = context.request.getHeaders()
  const variableDefinitions = headers
    .filter(header => isCustomHeader(header.name))
    .map(header => {
      context.request.removeHeader(header.name)
      return parseCustomHeader(header.name)
    })
  await context.store.setItem('variableDefinitions', JSON.stringify(variableDefinitions))
}
