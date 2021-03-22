export const variableSavingResponseHook: Insomnia.ResponseHook = async (context: Insomnia.ResponseHookContext) => {
  context.store.setItem('my-variable', context.response.getStatusCode().toString())
}
