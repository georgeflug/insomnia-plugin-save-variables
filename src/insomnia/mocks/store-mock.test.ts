import { createMockStore } from './store-mock'

describe('Store Mock', () => {
  it('getItem() should get an item that was added to the store', async () => {
    const store = createMockStore()
    await store.setItem('key1', 'value1')

    const result = await store.getItem('key1')

    expect(result).toEqual('value1')
  })

  it('all() should get all items that were added to the store', async () => {
    const store = createMockStore()
    await store.setItem('key1', 'value1')
    await store.setItem('key2', 'value2')

    const result = await store.all()

    expect(result).toEqual([
      {
        key: 'key1',
        value: 'value1',
      },
      {
        key: 'key2',
        value: 'value2',
      },
    ])
  })

  it('getItem() should return null if an item does not exist', async () => {
    const store = createMockStore()

    const result = await store.getItem('key1')

    expect(result).toEqual(null)
  })

  it('hasItem() should return whether an item exists', async () => {
    const store = createMockStore()
    await store.setItem('key1', 'value1')

    const hasItem1 = await store.hasItem('key1')
    const hasItem2 = await store.hasItem('key2')

    expect(hasItem1).toEqual(true)
    expect(hasItem2).toEqual(false)
  })

  it('removeItem() should successfully remove an item', async () => {
    const store = createMockStore()
    await store.setItem('key1', 'value1')
    await store.removeItem('key1')

    const hasItem = await store.hasItem('key1')
    const item = await store.getItem('key1')
    const allItems = await store.all()

    expect(hasItem).toEqual(false)
    expect(item).toEqual(null)
    expect(allItems).toEqual([])
  })

  it('clear() should successfully remove all items', async () => {
    const store = createMockStore()
    await store.setItem('key1', 'value1')
    await store.setItem('key2', 'value2')
    await store.clear()

    const hasItem1 = await store.hasItem('key1')
    const item1 = await store.getItem('key1')
    const hasItem2 = await store.hasItem('key2')
    const item2 = await store.getItem('key2')
    const allItems = await store.all()

    expect(hasItem1).toEqual(false)
    expect(item1).toEqual(null)
    expect(hasItem2).toEqual(false)
    expect(item2).toEqual(null)
    expect(allItems).toEqual([])
  })
})
