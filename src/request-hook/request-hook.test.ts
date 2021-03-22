import { variableDeclarationHeaderRequestHook } from "./request-hook"

describe('Variable Declaration Header Request Hook', () => {

  it('should remove the custom header from the request', () => {
    const getHeaderMock = jest.fn().mockReturnValue('this is the header value')
    const removeHeaderMock = jest.fn()
    const context = {
      request: {
        getHeader: getHeaderMock,
        removeHeader: removeHeaderMock,
      } as Partial<Insomnia.RequestContext> as Insomnia.RequestContext
    } as Partial<Insomnia.RequestHookContext> as Insomnia.RequestHookContext

    variableDeclarationHeaderRequestHook(context)

    expect(getHeaderMock).toHaveBeenCalledWith('X-save-variable')
    expect(removeHeaderMock).toHaveBeenCalledWith('X-save-variable')
  })

})