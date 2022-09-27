import { createDeletionHeader } from '../custom-header-format/deletion/deletion'
import { TemplateRunContext } from '../insomnia/types/template-context'
import { TemplateTag, LiveDisplayArg } from '../insomnia/types/template-tag'

export const deletionTemplateTag: TemplateTag = {
  name: 'deletevariable',
  displayName: 'Delete Variable',
  description: 'delete variable after response is received',
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
      displayName: 'Delete Variable only if Status Code matches',
      description: 'This field is optional. Exact status code and regex are allowed, e.g. "200" or "2.."',
      type: 'string',
      defaultValue: '',
    },
    {
      displayName: args => (args[1].value === 'body' ? 'Response JSON Path' : 'Header Name'),
      defaultValue: '',
      type: 'string',
    },
  ],
  run: async (context: TemplateRunContext, variableNameArg: unknown, statusCodeMatcherArg: unknown) => {
    const variableName = variableNameArg as string
    const statusCodeMatcher = statusCodeMatcherArg as string
    return createDeletionHeader({ variableName, statusCodeMatcher })
  },
}
