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

  it('should return a list of one variable if the requested variable does not exist', async () => {
    await store.setItem('variable-statusCode', '404')

    const result = await savedVariableTemplateTag.run(context, 'doesNotExist')

    expect(result).toEqual('No variable with name "doesNotExist". Choices are [\n"statusCode"\n]')
  })

  it('should return a list of multiple variables if the requested variable does not exist', async () => {
    await store.setItem('variable-statusCode', '404')
    await store.setItem('variable-statusMessage', 'Not Found')

    const result = await savedVariableTemplateTag.run(context, 'doesNotExist')

    expect(result).toEqual('No variable with name "doesNotExist". Choices are [\n"statusCode",\n"statusMessage"\n]')
  })
})
