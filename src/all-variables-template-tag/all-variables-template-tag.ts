import { TemplateRunContext } from '../insomnia/types/template-context'
import { TemplateTag } from '../insomnia/types/template-tag'

export const allVariablesTemplateTag: TemplateTag = {
  name: 'allvariables',
  displayName: 'All Variables',
  run: async (context: TemplateRunContext) => {
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
