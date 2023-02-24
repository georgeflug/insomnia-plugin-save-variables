import { createVariableDefinitionHeader } from '../custom-header-format/variable-definition/variable-definition'
import { TemplateRunContext } from '../insomnia/types/template-context'
import { definitionTemplateTag } from './definition-template-tag'

describe('Definition Template Tag', () => {
  const context = {
    meta: {
      workspaceId: 'wrk_12345',
    },
  } as TemplateRunContext

  it('should return formatted header name', async () => {
    const result = await definitionTemplateTag.run(context, 'ticketId', 'responseBody', '', 'json', '$.id')

    const expectedHeaderName = createVariableDefinitionHeader({
      variableName: 'ticketId',
      source: 'responseBody',
      sourceArg: '',
      extractor: 'json',
      extractorArg: '$.id',
      workspaceId: 'wrk_12345',
    })

    expect(result).toEqual(expectedHeaderName)
  })
})
