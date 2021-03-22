export const variableDeclarationHeaderRequestHook: Insomnia.RequestHook = (context: Insomnia.RequestHookContext) => {
  context.request.getHeader('X-save-variable')
  context.request.removeHeader('X-save-variable')
}
