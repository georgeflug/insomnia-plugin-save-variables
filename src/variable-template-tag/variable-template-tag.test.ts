import { createMockStore } from '../insomnia/mocks/store-mock'
import { TemplateRunContext } from '../insomnia/types/template-context'
import { getVariableKey } from '../variable-key'
import { savedVariableTemplateTag } from './variable-template-tag'

jest.mock('sweetalert', () => ({}))

describe('Saved Variable Template Tag', () => {
  const store = createMockStore()
  const workspaceId = 'wrk_87654'
  const context = ({
    store,
    meta: {
      workspaceId: workspaceId,
    },
  } as Partial<TemplateRunContext>) as TemplateRunContext

  beforeEach(() => {
    store.clear()
  })

  it('should return the requested variable', async () => {
    await store.setItem(getVariableKey(workspaceId, 'statusCode'), '404')

    const result = await savedVariableTemplateTag.run(context, 'statusCode')

    expect(result).toEqual('404')
  })

  it('should return the requested variable if the value is null', async () => {
    await store.setItem(getVariableKey(workspaceId, 'myVariable'), null)

    const result = await savedVariableTemplateTag.run(context, 'myVariable')

    expect(result).toEqual(null)
  })

  it('should return a list of one variable if the requested variable does not exist', async () => {
    await store.setItem(getVariableKey(workspaceId, 'statusCode'), '404')

    const result = await savedVariableTemplateTag.run(context, 'doesNotExist')

    expect(result).toEqual('No variable with name "doesNotExist". Choices are [\n"statusCode"\n]')
  })

  it('should return a list of multiple variables if the requested variable does not exist', async () => {
    await store.setItem(getVariableKey(workspaceId, 'statusCode'), '404')
    await store.setItem(getVariableKey(workspaceId, 'statusMessage'), 'Not Found')

    const result = await savedVariableTemplateTag.run(context, 'doesNotExist')

    expect(result).toEqual('No variable with name "doesNotExist". Choices are [\n"statusCode",\n"statusMessage"\n]')
  })

  it('if the requested variable does not exist, the list of available variables should exclude variables from other workspaces', async () => {
    await store.setItem(getVariableKey(workspaceId, 'statusCode'), '404')
    await store.setItem(getVariableKey(workspaceId + 'otherWorkspace', 'myOtherVar'), 'doesNotMatter')

    const result = await savedVariableTemplateTag.run(context, 'doesNotExist')

    expect(result).toEqual('No variable with name "doesNotExist". Choices are [\n"statusCode"\n]')
  })

  it('if the requested variable does not exist, the list of available variables should exclude variables from old version of this plugin that were not scoped to the current workspace', async () => {
    await store.setItem(getVariableKey(workspaceId, 'statusCode'), '404')
    await store.setItem('variable-myOtherVar', 'doesNotMatter')

    const result = await savedVariableTemplateTag.run(context, 'doesNotExist')

    expect(result).toEqual('No variable with name "doesNotExist". Choices are [\n"statusCode"\n]')
  })

  it('should return message saying no variables exist when no variables exist', async () => {
    // no arrange

    const result = await savedVariableTemplateTag.run(context, 'doesNotExist')

    expect(result).toEqual('No variable with name "doesNotExist". No variables have been set yet.')
  })
})
