export const variableSavingResponseHook: Insomnia.ResponseHook = async (context: Insomnia.ResponseHookContext) => {
  await context.store.setItem('variable-statusCode', context.response.getStatusCode().toString())
}
