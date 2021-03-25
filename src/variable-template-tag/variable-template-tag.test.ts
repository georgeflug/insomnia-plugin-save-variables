import { createMockStore } from '../insomnia/store-mock'
import { savedVariableTemplateTag } from './variable-template-tag'

describe('Saved Variable Template Tag', () => {
  const store = createMockStore()
  const context = ({
    store,
  } as Partial<Insomnia.TemplateRunContext>) as Insomnia.TemplateRunContext

  it('should return the requested variable', async () => {
    await store.setItem('variable-statusCode', '404')

    const result = await savedVariableTemplateTag.run(context, 'statusCode')

    expect(result).toEqual('404')
  })
})
