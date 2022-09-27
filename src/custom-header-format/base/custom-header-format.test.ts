import { createCustomHeader, parseCustomHeader } from './custom-header-format'

describe('Custom Header Format', () => {
  it('should create and parse custom header', () => {
    const prefix = 'myPrefix'
    const data = ['val1', 'val2']
    const header = createCustomHeader(prefix, data)

    const parsed = parseCustomHeader(header, prefix)

    expect(parsed).toEqual(data)
  })

  it('should create and parse custom header with dashes in it', () => {
    const prefix = 'my-prefix-with-dashes'
    const data = ['val1-dashes', 'val2-so-many-dashes']
    const header = createCustomHeader(prefix, data)

    const parsed = parseCustomHeader(header, prefix)

    expect(parsed).toEqual(data)
  })
})
