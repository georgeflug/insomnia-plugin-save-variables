export const savedVariableTemplateTag: Insomnia.TemplateTag = {
  name: 'variable',
  displayName: 'Saved Variable',
  args: [
    {
      displayName: 'Variable Name',
      defaultValue: '',
      type: 'string',
    },
  ],
  run: async (context: Insomnia.TemplateRunContext, variableNameArg: unknown) => {
    const variableName = variableNameArg as string
    return await context.store.getItem(`variable-${variableName}`)
  },
}
