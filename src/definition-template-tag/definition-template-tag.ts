import { createVariableDefinitionHeader } from '../custom-header-format/variable-definition/variable-definition'
import { TemplateRunContext } from '../insomnia/types/template-context'
import { TemplateTag, LiveDisplayArg } from '../insomnia/types/template-tag'

export const definitionTemplateTag: TemplateTag = {
  name: 'savevariable',
  displayName: 'Save Variable',
  description: 'save response value to a variable',
  liveDisplayName: (args: LiveDisplayArg[]) => {
    return `Save Variable - ${args[0].value}`
  },
  args: [
    {
      displayName: 'Variable Name',
      defaultValue: '',
      type: 'string',
    },
    {
      displayName: 'Attribute',
      type: 'enum',
      defaultValue: 'bodyJson',
      options: [
        {
          displayName: 'Body Attribute',
          description: 'value of response body',
          value: 'bodyJson',
        },
        {
          displayName: 'Header',
          description: 'value of response header',
          value: 'header',
        },
      ],
    },
    {
      displayName: args => (args[1].value === 'bodyJson' ? 'Response JSON Path' : 'Header Name'),
      defaultValue: '',
      type: 'string',
    },
  ],
  run: async (context: TemplateRunContext, variableNameArg: unknown, attributeArg: unknown, pathArg: unknown) => {
    const variableName = variableNameArg as string
    const type = attributeArg as string
    const path = pathArg as string
    const workspaceId = context.meta.workspaceId
    return createVariableDefinitionHeader({ variableName, type, path, workspaceId })
  },
}
