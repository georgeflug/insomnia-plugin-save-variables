import { createMockStore } from '../insomnia/mocks/store-mock'
import { TemplateRunContext } from '../insomnia/types/template-context'
import { savedVariableTemplateTag } from './variable-template-tag'

describe('Saved Variable Template Tag', () => {
  const store = createMockStore()
  const context = ({
    store,
  } as Partial<TemplateRunContext>) as TemplateRunContext

  it('should return the requested variable', async () => {
    await store.setItem('variable-statusCode', '404')

    const result = await savedVariableTemplateTag.run(context, 'statusCode')

    expect(result).toEqual('404')
  })
})
