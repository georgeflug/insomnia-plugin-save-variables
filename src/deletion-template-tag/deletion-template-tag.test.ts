import { TemplateRunContext } from '../insomnia/types/template-context'
import { deletionTemplateTag } from './deletion-template-tag'
import { createDeletionHeader } from '../custom-header-format/deletion/deletion'

describe('Deletion Template Tag', () => {
  const context = {
    meta: {
      workspaceId: 'wrk_12345',
    },
  } as TemplateRunContext

  it('should return formatted header name', async () => {
    const result = await deletionTemplateTag.run(context, 'ticketId', '2..')

    const expectedHeaderName = createDeletionHeader({
      variableName: 'ticketId',
      statusCodeMatcher: '2..',
    })

    expect(result).toEqual(expectedHeaderName)
  })
})
