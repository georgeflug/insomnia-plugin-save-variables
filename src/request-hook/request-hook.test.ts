import { variableDeclarationHeaderRequestHook } from "./request-hook"

describe('Variable Declaration Header Request Hook', () => {
  const getHeaderMock = jest.fn()
  const removeHeaderMock = jest.fn()
  const context = {
    request: {
      getHeader: getHeaderMock,
      removeHeader: removeHeaderMock,
    } as Partial<Insomnia.RequestContext> as Insomnia.RequestContext
  } as Partial<Insomnia.RequestHookContext> as Insomnia.RequestHookContext

  it('should remove the custom header from the request when it is present', () => {
    getHeaderMock.mockReturnValue('this is the header value')

    variableDeclarationHeaderRequestHook(context)

    expect(getHeaderMock).toHaveBeenCalledWith('X-save-variable')
    expect(removeHeaderMock).toHaveBeenCalledWith('X-save-variable')
  })

  it('should not remove the custom header from the request if it is not present', () => {
    getHeaderMock.mockReturnValue(null)

    variableDeclarationHeaderRequestHook(context)

    expect(getHeaderMock).toHaveBeenCalledWith('X-save-variable')
    expect(removeHeaderMock).not.toHaveBeenCalled()
  })

})
