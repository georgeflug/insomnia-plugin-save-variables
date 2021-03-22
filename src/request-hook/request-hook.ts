export const variableDeclarationHeaderRequestHook: Insomnia.RequestHook = (context: Insomnia.RequestHookContext) => {
  const headerValue = context.request.getHeader('X-save-variable')
  if (headerValue) {
    context.request.removeHeader('X-save-variable')
    context.store.setItem('saved-variable', headerValue)
  }
}
