import { definitionTemplateTag } from './definition-template-tag'

describe('Definition Template Tag', () => {
  const context = {} as Insomnia.TemplateRunContext

  it('should return formatted header name', async () => {
    const result = await definitionTemplateTag.run(context, 'ticketId', '$.id')

    expect(result).toEqual('X-Save-Variable-dGlja2V0SWQ=-JC5pZA==')
  })
})
