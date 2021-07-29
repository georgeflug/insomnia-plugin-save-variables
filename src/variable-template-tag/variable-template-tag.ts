import { TemplateRunContext } from '../insomnia/types/template-context'
import { TemplateTag, LiveDisplayArg } from '../insomnia/types/template-tag'

export const savedVariableTemplateTag: TemplateTag = {
  name: 'variable',
  displayName: 'Variable',
  description: 'use a saved variable',
  liveDisplayName: (args: LiveDisplayArg[]) => {
    return `Variable - ${args[0].value}`
  },
  args: [
    {
      displayName: 'Variable Name',
      defaultValue: '',
      type: 'string',
    },
  ],
  run: async (context: TemplateRunContext, variableNameArg: unknown) => {
    const variableName = variableNameArg as string
    const result = await context.store.getItem(`variable-${variableName}`)
    if (result === null) {
      return await getHelpfulErrorMessage(context, variableName)
    }
    return result
  },
}

async function getHelpfulErrorMessage(context: TemplateRunContext, variableName: string): Promise<string> {
  const allItems = await context.store.all()
  const variables = allItems
    .filter(item => item.key.startsWith('variable-'))
    .map(item => `"${item.key.substring(9)}"`)
    .join(',\n')
  return `No variable with name "${variableName}". Choices are [\n${variables}\n]`
}
