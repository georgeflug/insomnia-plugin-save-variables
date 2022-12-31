import { createVariableDefinitionHeader } from '../custom-header-format/variable-definition/variable-definition'
import { TemplateRunContext } from '../insomnia/types/template-context'
import { TemplateTag, LiveDisplayArg } from '../insomnia/types/template-tag'
import { allValueExtractors } from '../value-extractors/all-value-extractors'

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
      defaultValue: allValueExtractors[0].type,
      options: allValueExtractors.map(e => ({
        displayName: e.display.name,
        description: e.display.description,
        value: e.type,
      })),
    },
    {
      displayName: args => allValueExtractors.find(e => e.type === args[1].value)?.display.argument ?? '',
      defaultValue: '',
      type: 'string',
    },
  ],
  run: async (context: TemplateRunContext, variableNameArg: unknown, attributeArg: unknown, extraArg: unknown) => {
    const variableName = variableNameArg as string
    const type = attributeArg as string
    const arg = extraArg as string
    const workspaceId = context.meta.workspaceId
    return createVariableDefinitionHeader({ variableName, type, arg, workspaceId })
  },
}
