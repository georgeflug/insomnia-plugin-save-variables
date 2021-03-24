import { isCustomHeader, parseCustomHeader } from '../custom-header-format/custom-header-format'

export const variableDeclarationHeaderRequestHook: Insomnia.RequestHook = async (
  context: Insomnia.RequestHookContext,
) => {
  const headers = context.request.getHeaders()
  const promises = headers
    .filter(header => isCustomHeader(header.name))
    .map(async header => {
      context.request.removeHeader(header.name)
      const variableDefinition = parseCustomHeader(header.name)
      await context.store.setItem(`variable-${variableDefinition.variableName}`, variableDefinition.jsonPath)
    })
  await Promise.all(promises)
}
