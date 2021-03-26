import { createMockHeaders } from './headers-mock'

describe('Headers Mock', () => {
  it('getHeader() should get an item that was added to the headers', () => {
    const headers = createMockHeaders()
    headers.setHeader('name1', 'value1')

    const result = headers.getHeader('name1')

    expect(result).toEqual('value1')
  })

  it('getHeaders() should get all headers that were added or set', () => {
    const headers = createMockHeaders()
    headers.setHeader('name1', 'value1')
    headers.addHeader('name2', 'value2')

    const result = headers.getHeaders()

    expect(result).toEqual([
      {
        name: 'name1',
        value: 'value1',
      },
      {
        name: 'name2',
        value: 'value2',
      },
    ])
  })

  it('getHeader() should return null if an item does not exist', () => {
    const headers = createMockHeaders()

    const result = headers.getHeader('name1')

    expect(result).toEqual(null)
  })

  it('hasHeader() should return whether an item exists', () => {
    const headers = createMockHeaders()
    headers.setHeader('name1', 'value1')

    const hasHeader1 = headers.hasHeader('name1')
    const hasHeader2 = headers.hasHeader('name2')

    expect(hasHeader1).toEqual(true)
    expect(hasHeader2).toEqual(false)
  })

  it('removeHeader() should successfully remove an item', () => {
    const headers = createMockHeaders()
    headers.setHeader('name1', 'value1')
    headers.removeHeader('name1')

    const hasHeader = headers.hasHeader('name1')
    const item = headers.getHeader('name1')
    const allItems = headers.getHeaders()

    expect(hasHeader).toEqual(false)
    expect(item).toEqual(null)
    expect(allItems).toEqual([])
  })
})
