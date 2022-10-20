import { createMockHeaders } from '../../insomnia/mocks/headers-mock'
import { createMockStore } from '../../insomnia/mocks/store-mock'
import { RequestContextHeaders, RequestContext } from '../../insomnia/types/request-context'
import { RequestHookContext } from '../../insomnia/types/request-hook-context'
import { deletionHeaderRequestHook } from './request-hook'
import { createDeletionHeader, DeletionDefinition } from '../../custom-header-format/deletion/deletion'

describe('Deletion Header Request Hook', () => {
  const store = createMockStore()
  let headers: RequestContextHeaders
  let context: RequestHookContext

  beforeEach(() => {
    headers = createMockHeaders()
    context = ({
      request: ({
        ...headers,
      } as Partial<RequestContext>) as RequestContext,
      store,
    } as Partial<RequestHookContext>) as RequestHookContext
  })

  it('should remove the custom header from the request when it is present', async () => {
    const deletion: DeletionDefinition = {
      variableName: 'myVar',
      statusCodeMatcher: '200',
    }
    const headerName = createDeletionHeader(deletion)
    headers.setHeader(headerName, 'doesNotMatter')

    await deletionHeaderRequestHook(context)

    expect(headers.getHeaders()).toEqual([])
  })

  it('should not remove the custom header from the request if it is not present', async () => {
    headers.setHeader('Content-Type', 'application/json')

    await deletionHeaderRequestHook(context)

    expect(headers.getHeaders()).toEqual([{ name: 'Content-Type', value: 'application/json' }])
  })

  it('should save the custom header value for the response hook to read later', async () => {
    const deletion: DeletionDefinition = {
      variableName: 'myVar',
      statusCodeMatcher: '200',
    }
    const headerName = createDeletionHeader(deletion)
    headers.setHeader(headerName, 'doesNotMatter')

    await deletionHeaderRequestHook(context)

    expect(await store.getItem('variableDeletions')).toEqual(JSON.stringify([deletion]))
  })
})
