import { variableDeclarationHeaderRequestHook } from "./request-hook"

describe('Variable Declaration Header Request Hook', () => {
  const getHeaderMock = jest.fn()
  const removeHeaderMock = jest.fn()
  const storeSetItemMock = jest.fn()
  const context = {
    request: {
      getHeader: getHeaderMock,
      removeHeader: removeHeaderMock,
    } as Partial<Insomnia.RequestContext> as Insomnia.RequestContext,
    store: {
      setItem: storeSetItemMock
    } as Partial<Insomnia.StoreContext> as Insomnia.StoreContext
  } as Partial<Insomnia.RequestHookContext> as Insomnia.RequestHookContext

  it('should remove the custom header from the request when it is present', async () => {
    getHeaderMock.mockReturnValue('this is the header value')

    await variableDeclarationHeaderRequestHook(context)

    expect(getHeaderMock).toHaveBeenCalledWith('X-Save-Variable')
    expect(removeHeaderMock).toHaveBeenCalledWith('X-Save-Variable')
  })

  it('should not remove the custom header from the request if it is not present', async () => {
    getHeaderMock.mockReturnValue(null)

    await variableDeclarationHeaderRequestHook(context)

    expect(getHeaderMock).toHaveBeenCalledWith('X-Save-Variable')
    expect(removeHeaderMock).not.toHaveBeenCalled()
  })

  it('should save the custom header value for the response hook to read later', async () => {
    const headerValue = 'very-important-stuff-here'
    getHeaderMock.mockReturnValue(headerValue)

    await variableDeclarationHeaderRequestHook(context)

    expect(storeSetItemMock).toHaveBeenCalledWith('saved-variable', headerValue)
  })

})
