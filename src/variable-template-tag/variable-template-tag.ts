import { TemplateRunContext, TemplateActionContext } from '../insomnia/types/template-context'
import { TemplateTag, LiveDisplayArg } from '../insomnia/types/template-tag'
import prompt from 'electron-prompt'

let lastStoreItemName = ''

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
  actions: [
    {
      name: 'Update Custom Value',
      run: async (context: TemplateActionContext, ...args: unknown[]): Promise<void> => {
        if (lastStoreItemName !== null) {
          try {
            const currentValue = await context.store.getItem(lastStoreItemName)
            const newValue = await prompt({
              title: 'Update Custom Value',
              label: 'Custom Value:',
              value: currentValue,
              inputAttrs: {
                type: 'text',
              },
              type: 'input',
            })
            if (newValue !== null) {
              context.store.setItem(lastStoreItemName, newValue)
            }
          } catch (e) {
            console.error(e)
          }
        }
      },
    },
  ],
  run: async (context: TemplateRunContext, variableNameArg: unknown) => {
    const variableName = variableNameArg as string
    const storeItemName = `variable-${variableName}`
    lastStoreItemName = storeItemName
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
