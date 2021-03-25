export const allVariablesTemplateTag: Insomnia.TemplateTag = {
  name: 'allvariables',
  displayName: 'All Variables',
  run: async (context: Insomnia.TemplateRunContext) => {
    const allItems = await context.store.all()
    const variables = allItems
      .filter(item => item.key.startsWith('variable-'))
      .reduce((acc: Record<string, string>, curr) => {
        acc[curr.key.substring(9)] = curr.value
        return acc
      }, {})
    return JSON.stringify(variables, null, 2)
  },
}
