export const variableDeclarationHeaderRequestHook: Insomnia.RequestHook = async (
  context: Insomnia.RequestHookContext,
) => {
  const headerValue = context.request.getHeader('X-Save-Variable')
  if (headerValue) {
    context.request.removeHeader('X-Save-Variable')
    await context.store.setItem('variable-savedHeader', headerValue)
  }
}
