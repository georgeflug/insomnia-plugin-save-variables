import { TemplateRunContext, TemplateActionContext } from '../insomnia/types/template-context'
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
    {
      displayName: `Custom Value`,
      defaultValue: '',
      type: 'string',
    },
  ],
  actions: [
    {
      name : 'Update Custom Value',
      run: async (context: TemplateActionContext) => {
        const customValueKey = await context.store.getItem("customValueKey")
        const customValue = await context.store.getItem("customValue")
        if (customValueKey !== null) {
            context.store.setItem(customValueKey, customValue)
        }
      },
    }
  ],
  run: async (context: TemplateRunContext, variableNameArg: unknown, customValueArg: unknown) => {
    const variableName = variableNameArg as string
    const setCustom = customValueArg as string
    const storeItemName = `variable-${variableName}`
    if (setCustom !== undefined) {
        await context.store.setItem("customValueKey", storeItemName)
        await context.store.setItem("customValue", setCustom)
    }
    if (await context.store.hasItem(storeItemName)) {
      return await context.store.getItem(storeItemName)
    }
    return await getHelpfulErrorMessage(context, variableName)
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
