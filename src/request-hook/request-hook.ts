export const variableDeclarationHeaderRequestHook: Insomnia.RequestHook = (context: Insomnia.RequestHookContext) => {
  const headerValue = context.request.getHeader('X-Save-Variable')
  if (headerValue) {
    context.request.removeHeader('X-Save-Variable')
    context.store.setItem('saved-variable', headerValue)
  }
}
