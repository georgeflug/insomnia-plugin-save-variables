import {
  AttributeType,
  createVariableDefinitionHeader,
} from '../custom-header-format/variable-definition/variable-definition'
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
      defaultValue: 'body',
      options: [
        {
          displayName: 'Body Attribute',
          description: 'value of response body',
          value: 'body',
        },
        {
          displayName: 'Header',
          description: 'value of response header',
          value: 'header',
        },
      ],
    },
    {
      displayName: args => (args[1].value === 'body' ? 'Response JSON Path' : 'Header Name'),
      defaultValue: '',
      type: 'string',
    },
  ],
  run: async (context: TemplateRunContext, variableNameArg: unknown, attributeArg: unknown, pathArg: unknown) => {
    const variableName = variableNameArg as string
    const attribute = attributeArg as AttributeType
    const path = pathArg as string
    const workspaceId = context.meta.workspaceId
    return createVariableDefinitionHeader({ variableName, attribute, path, workspaceId })
  },
}
