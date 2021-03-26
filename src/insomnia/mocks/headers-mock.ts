import { RequestContextHeaders } from '../types/request-context'

export function createMockHeaders(): RequestContextHeaders {
  const items = new Map()

  return {
    getHeaders: () =>
      Array.from(items).map(([name, value]) => ({
        name,
        value,
      })),
    getHeader: name => (items.has(name) ? items.get(name) : null),
    hasHeader: name => items.has(name),
    removeHeader: name => {
      items.delete(name)
    },
    setHeader: (name, value) => {
      items.set(name, value)
    },
    addHeader: (name, value) => {
      items.set(name, value)
    },
  }
}
