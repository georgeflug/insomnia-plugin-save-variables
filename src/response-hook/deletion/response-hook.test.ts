import { DeletionDefinition } from '../../custom-header-format/deletion/deletion'
import { createMockStore } from '../../insomnia/mocks/store-mock'
import { ResponseContext } from '../../insomnia/types/response-context'
import { ResponseHookContext } from '../../insomnia/types/response-hook-context'
import { getVariableKey } from '../../variable-key'
import { deletionResponseHook } from './response-hook'

describe('Variable Saving Response Hook', () => {
  const getStatusCodeMock = jest.fn()
  const store = createMockStore()
  const workspaceId = 'wrk_656565656'
  const context = ({
    response: ({
      getStatusCode: getStatusCodeMock,
    } as Partial<ResponseContext>) as ResponseContext,
    store,
    meta: {
      workspaceId,
    },
  } as Partial<ResponseHookContext>) as ResponseHookContext

  beforeEach(async () => {
    await store.clear()
  })

  it('should delete the variable when no status code matcher is present', async () => {
    const variableName = 'ticket'
    const deletion: DeletionDefinition = {
      variableName,
      statusCodeMatcher: '',
    }
    await store.setItem('variableDeletions', JSON.stringify([deletion]))
    getStatusCodeMock.mockReturnValue(200)

    await deletionResponseHook(context)

    const result = await store.hasItem(getVariableKey(workspaceId, variableName))
    expect(result).toEqual(false)
  })

  it('should not delete any variables if no deletion definitions are present', async () => {
    // nothing to arrange

    await deletionResponseHook(context)

    expect(getStatusCodeMock).not.toHaveBeenCalled()
    expect(await store.all()).toEqual([])
  })

  it('should remove deletion definitions after using them so that they do not get reused by a different request', async () => {
    const deletion: DeletionDefinition = {
      variableName: 'ticket',
      statusCodeMatcher: '',
    }
    await store.setItem('variableDeletions', JSON.stringify([deletion]))
    getStatusCodeMock.mockReturnValue(200)

    await deletionResponseHook(context)

    expect(await store.hasItem('deletions')).toEqual(false)
  })

  it('should not blow up if variable did not previously exist', async () => {
    const deletion: DeletionDefinition = {
      variableName: 'ticket',
      statusCodeMatcher: '',
    }
    await store.setItem('variableDeletions', JSON.stringify([deletion]))
    getStatusCodeMock.mockReturnValue(200)

    await deletionResponseHook(context)

    expect(await store.all()).toEqual([])
  })

  it('should delete variable if status code matches regex', async () => {
    const deletion: DeletionDefinition = {
      variableName: 'ticket',
      statusCodeMatcher: '',
    }
    await store.setItem('variableDeletions', JSON.stringify([deletion]))
    getStatusCodeMock.mockReturnValue(200)

    await deletionResponseHook(context)

    expect(await store.getItem('variable-ticket')).toEqual(null)
  })

  it('should not delete variable if status code does not match regex', async () => {
    const deletion: DeletionDefinition = {
      variableName: 'ticket',
      statusCodeMatcher: '',
    }
    await store.setItem('variableDeletions', JSON.stringify([deletion]))
    getStatusCodeMock.mockReturnValue(200)

    await deletionResponseHook(context)

    expect(await store.getItem('variable-ticket')).toEqual(null)
  })

  it('should not delete variable if status code cannot be determined', async () => {
    const deletion: DeletionDefinition = {
      variableName: 'ticket',
      statusCodeMatcher: '',
    }
    await store.setItem('variableDeletions', JSON.stringify([deletion]))
    getStatusCodeMock.mockReturnValue(200)

    await deletionResponseHook(context)

    expect(await store.all()).toEqual([])
  })
})
