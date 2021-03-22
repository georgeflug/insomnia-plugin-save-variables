import { variableSavingResponseHook } from './response-hook'

describe('Variable Saving Response Hook', () => {
  const getStatusCodeMock = jest.fn()
  const storeSetItemMock = jest.fn()
  const context = ({
    response: ({
      getStatusCode: getStatusCodeMock,
    } as Partial<Insomnia.ResponseContext>) as Insomnia.ResponseContext,
    store: ({
      setItem: storeSetItemMock,
    } as Partial<Insomnia.StoreContext>) as Insomnia.StoreContext,
  } as Partial<Insomnia.ResponseHookContext>) as Insomnia.ResponseHookContext

  it('should save the status code of the response into a variable', async () => {
    const statusCode = 404
    getStatusCodeMock.mockReturnValue(statusCode)

    await variableSavingResponseHook(context)

    expect(storeSetItemMock).toHaveBeenCalledWith('my-variable', statusCode.toString())
  })
})
