import { createCustomHeader } from '../custom-header-format/custom-header-format'

export const definitionTemplateTag: Insomnia.TemplateTag = {
  name: 'savevariable',
  displayName: 'Save Variable',
  liveDisplayName: (args: Insomnia.LiveDisplayArg[]) => {
    return `Save Variable - ${args[0].value}`
  },
  args: [
    {
      displayName: 'Variable Name',
      defaultValue: '',
      type: 'string',
    },
    {
      displayName: 'Response JSON Path',
      defaultValue: '',
      type: 'string',
    },
  ],
  run: async (context: Insomnia.TemplateRunContext, variableNameArg: unknown, jsonPathArg: unknown) => {
    const variableName = variableNameArg as string
    const jsonPath = jsonPathArg as string
    return createCustomHeader({ variableName, jsonPath })
  },
}
