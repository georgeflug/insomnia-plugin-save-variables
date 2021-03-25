import { createCustomHeader } from '../custom-header-format/custom-header-format'
import { VariableDefinition } from '../custom-header-format/variable-definition'
import { createMockStore } from '../insomnia/store-mock'
import { variableDeclarationHeaderRequestHook } from './request-hook'

describe('Variable Declaration Header Request Hook', () => {
  const getHeaderMock = jest.fn()
  const getHeadersMock = jest.fn<Insomnia.Header[], any[]>()
  const removeHeaderMock = jest.fn()
  const store = createMockStore()
  const context = ({
    request: ({
      getHeader: getHeaderMock,
      getHeaders: getHeadersMock,
      removeHeader: removeHeaderMock,
    } as Partial<Insomnia.RequestContext>) as Insomnia.RequestContext,
    store,
  } as Partial<Insomnia.RequestHookContext>) as Insomnia.RequestHookContext

  it('should remove the custom header from the request when it is present', async () => {
    const variableDefinition = {
      variableName: 'myVar',
      jsonPath: '$.id',
    } as VariableDefinition
    const headerName = createCustomHeader(variableDefinition)
    getHeadersMock.mockReturnValue([{ name: headerName, value: '' }])

    await variableDeclarationHeaderRequestHook(context)

    expect(removeHeaderMock).toHaveBeenCalledWith(headerName)
  })

  it('should not remove the custom header from the request if it is not present', async () => {
    getHeadersMock.mockReturnValue([{ name: 'Content-type', value: 'application/json' }])

    await variableDeclarationHeaderRequestHook(context)

    expect(removeHeaderMock).not.toHaveBeenCalled()
  })

  it('should save the custom header value for the response hook to read later', async () => {
    const variableDefinition = {
      variableName: 'myVar',
      jsonPath: '$.id',
    } as VariableDefinition
    const headerName = createCustomHeader(variableDefinition)
    getHeadersMock.mockReturnValue([{ name: headerName, value: '' }])

    await variableDeclarationHeaderRequestHook(context)

    expect(await store.getItem('variableDefinitions')).toEqual(JSON.stringify([variableDefinition]))
  })
})
