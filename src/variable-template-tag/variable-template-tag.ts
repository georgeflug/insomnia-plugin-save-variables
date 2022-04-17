import { TemplateRunContext, TemplateActionContext } from '../insomnia/types/template-context'
import { TemplateTag, LiveDisplayArg } from '../insomnia/types/template-tag'
import { getVariableKey, parseVariableKey } from '../variable-key'
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
      name: 'Manually Update Value',
      run: async (context: TemplateActionContext): Promise<void> => {
        if (lastStoreItemName !== null) {
          const currentValue = await context.store.getItem(lastStoreItemName)
          const newValue = await prompt({
            title: 'Manually Update Value',
            label: 'New Value:',
            value: currentValue,
          })
          if (newValue !== null) {
            context.store.setItem(lastStoreItemName, newValue)
          }
        }
      },
    },
  ],
  run: async (context: TemplateRunContext, variableNameArg: unknown) => {
    const variableName = variableNameArg as string
    const storeItemName = getVariableKey(context.meta.workspaceId, variableName)
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
    .filter(item => item.key.split('-').length === 3)
    .map(item => parseVariableKey(item.key))
    .filter(keyParts => keyParts.workspaceId === context.meta.workspaceId)
    .map(keyParts => `"${keyParts.variableName}"`)
  if (variables.length === 0) {
    return `No variable with name "${variableName}". No variables have been set yet.`
  } else {
    return `No variable with name "${variableName}". Choices are [\n${variables.join(',\n')}\n]`
  }
}
