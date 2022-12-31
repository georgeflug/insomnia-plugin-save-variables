import { VariableDefinition } from '../../custom-header-format/variable-definition/variable-definition'
import { createMockStore } from '../../insomnia/mocks/store-mock'
import { ResponseContext } from '../../insomnia/types/response-context'
import { ResponseHookContext } from '../../insomnia/types/response-hook-context'
import { getVariableKey } from '../../variable-key'
import { variableSavingResponseHook } from './response-hook'

describe('Variable Saving Response Hook', () => {
  const getBodyMock = jest.fn()
  const store = createMockStore()
  const workspaceId = 'wrk_656565656'
  const context = ({
    response: ({
      getBody: getBodyMock,
    } as Partial<ResponseContext>) as ResponseContext,
    store,
    meta: {
      workspaceId,
    },
  } as Partial<ResponseHookContext>) as ResponseHookContext

  beforeEach(async () => {
    await store.clear()
  })

  it('should read the response body value into a variable using json path', async () => {
    const variableName = 'ticket'
    const variableDefinition: VariableDefinition = {
      variableName,
      type: 'bodyJson',
      arg: '$.ticketId',
      workspaceId,
    }
    const body = {
      someValue: 'test',
      ticketId: '123',
    }
    await store.setItem('variableDefinitions', JSON.stringify([variableDefinition]))
    getBodyMock.mockReturnValue(JSON.stringify(body))

    await variableSavingResponseHook(context)

    expect(await store.getItem(getVariableKey(workspaceId, variableName))).toEqual(body.ticketId)
  })

  it('should not read the response body or set any variables if no variable definitions are present', async () => {
    // nothing to arrange

    await variableSavingResponseHook(context)

    expect(getBodyMock).not.toHaveBeenCalled()
    expect(await store.all()).toEqual([])
  })

  it('should remove variable definitions after using them so that they do not get reused by a different request', async () => {
    const variableDefinition: VariableDefinition = {
      variableName: 'ticket',
      type: 'bodyJson',
      arg: '$',
      workspaceId,
    }
    const body = {
      someValue: 'test',
      ticketId: '123',
    }
    await store.setItem('variableDefinitions', JSON.stringify([variableDefinition]))
    getBodyMock.mockReturnValue(JSON.stringify(body))

    await variableSavingResponseHook(context)

    expect(await store.hasItem('variableDefinitions')).toEqual(false)
  })

  it('should not save variable if key cannot be found at path specified by json path', async () => {
    const variableDefinition: VariableDefinition = {
      variableName: 'ticket',
      type: 'bodyJson',
      arg: '$.doesNotExist',
      workspaceId,
    }
    const body = {
      ticketId: '123',
    }
    await store.setItem('variableDefinitions', JSON.stringify([variableDefinition]))
    getBodyMock.mockReturnValue(JSON.stringify(body))

    await variableSavingResponseHook(context)

    expect(await store.all()).toEqual([])
  })

  it('should save variable if value at key is expicitly null', async () => {
    const variableDefinition: VariableDefinition = {
      variableName: 'ticket',
      type: 'bodyJson',
      arg: '$.ticketId',
      workspaceId,
    }
    const body = {
      ticketId: null,
    }
    await store.setItem('variableDefinitions', JSON.stringify([variableDefinition]))
    getBodyMock.mockReturnValue(JSON.stringify(body))

    await variableSavingResponseHook(context)

    expect(await store.getItem('variable-ticket')).toEqual(null)
  })

  it('should not save variable if response body cannot be parsed as json', async () => {
    const variableDefinition: VariableDefinition = {
      variableName: 'ticket',
      type: 'bodyJson',
      arg: '$.ticketId',
      workspaceId,
    }
    const body = 'Hello. I am not JSON'
    await store.setItem('variableDefinitions', JSON.stringify([variableDefinition]))
    getBodyMock.mockReturnValue(body)

    await variableSavingResponseHook(context)

    expect(await store.all()).toEqual([])
  })
})
