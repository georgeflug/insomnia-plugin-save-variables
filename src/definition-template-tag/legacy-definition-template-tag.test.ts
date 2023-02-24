import { TemplateRunContext } from '../insomnia/types/template-context'
import { definitionTemplateTag } from './definition-template-tag'

describe('Definition Template Legacy Tag', () => {
  const context = {
    meta: {
      workspaceId: 'wrk_12345',
    },
  } as TemplateRunContext

  it('should return error information legacy tag', async () => {
    // nothing to arrange

    const result = await definitionTemplateTag.run(context, 'ticketId', 'body', '$.id')

    expect(result).toContain('insomnia-plugin-save-variables has a breaking change!')
  })
})
