import { VariableDefinition } from '../custom-header-format/variable-definition'
import { variableSavingResponseHook } from './response-hook'

describe('Variable Saving Response Hook', () => {
  const getStatusCodeMock = jest.fn()
  const getBodyMock = jest.fn()
  const storeGetItemMock = jest.fn()
  const storeSetItemMock = jest.fn()
  const storeRemoveItemMock = jest.fn()
  const context = ({
    response: ({
      getBody: getBodyMock,
      getStatusCode: getStatusCodeMock,
    } as Partial<Insomnia.ResponseContext>) as Insomnia.ResponseContext,
    store: ({
      getItem: storeGetItemMock,
      setItem: storeSetItemMock,
      removeItem: storeRemoveItemMock,
    } as Partial<Insomnia.StoreContext>) as Insomnia.StoreContext,
  } as Partial<Insomnia.ResponseHookContext>) as Insomnia.ResponseHookContext

  it('should read the response body value into a variable using json path', async () => {
    const VariableDefinition: VariableDefinition = {
      variableName: 'ticket',
      jsonPath: '$.ticketId',
    }
    const body = {
      someValue: 'test',
      ticketId: '123',
    }
    storeGetItemMock.mockResolvedValue(JSON.stringify([VariableDefinition]))
    getBodyMock.mockReturnValue(JSON.stringify(body))

    await variableSavingResponseHook(context)

    expect(storeSetItemMock).toHaveBeenCalledWith('variable-ticket', body.ticketId)
  })

  it('should not read the response body or set any variables if no variable definitions are present', async () => {
    storeGetItemMock.mockResolvedValue(null)

    await variableSavingResponseHook(context)

    expect(getBodyMock).not.toHaveBeenCalled()
    expect(storeSetItemMock).not.toHaveBeenCalled()
  })

  it('should remove variable definitions after using them so that they do not get reused by a different request', async () => {
    const VariableDefinition: VariableDefinition = {
      variableName: 'ticket',
      jsonPath: '$',
    }
    const body = {
      someValue: 'test',
      ticketId: '123',
    }
    storeGetItemMock.mockResolvedValue(JSON.stringify([VariableDefinition]))
    getBodyMock.mockReturnValue(JSON.stringify(body))

    await variableSavingResponseHook(context)

    expect(storeRemoveItemMock).toHaveBeenCalledWith('variableDefinitions')
  })

  it('should not save variable if key cannot be found at path specified by json path', async () => {
    const VariableDefinition: VariableDefinition = {
      variableName: 'ticket',
      jsonPath: '$.doesNotExist',
    }
    const body = {
      ticketId: '123',
    }
    storeGetItemMock.mockResolvedValue(JSON.stringify([VariableDefinition]))
    getBodyMock.mockReturnValue(JSON.stringify(body))

    await variableSavingResponseHook(context)

    expect(storeSetItemMock).not.toHaveBeenCalled()
  })

  it('should save variable if value at key is expicitly null', async () => {
    const VariableDefinition: VariableDefinition = {
      variableName: 'ticket',
      jsonPath: '$.ticketId',
    }
    const body = {
      ticketId: null,
    }
    storeGetItemMock.mockResolvedValue(JSON.stringify([VariableDefinition]))
    getBodyMock.mockReturnValue(JSON.stringify(body))

    await variableSavingResponseHook(context)

    expect(storeSetItemMock).toHaveBeenCalledWith('variable-ticket', null)
  })

  it('should not save variable if response body cannot be parsed as json', async () => {
    const VariableDefinition: VariableDefinition = {
      variableName: 'ticket',
      jsonPath: '$.ticketId',
    }
    const body = 'Hello. I am not JSON'
    storeGetItemMock.mockResolvedValue(JSON.stringify([VariableDefinition]))
    getBodyMock.mockReturnValue(JSON.stringify(body))

    await variableSavingResponseHook(context)

    expect(storeSetItemMock).not.toHaveBeenCalled()
  })
})
