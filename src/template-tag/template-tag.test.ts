import { savedVariableTemplateTag } from './template-tag'

describe('Saved Variable Template Tag', () => {
  const storeGetItemMock = jest.fn()
  const context = ({
    store: ({
      getItem: storeGetItemMock,
    } as Partial<Insomnia.StoreContext>) as Insomnia.StoreContext,
  } as Partial<Insomnia.TemplateRunContext>) as Insomnia.TemplateRunContext

  it('should return the requested variable', async () => {
    storeGetItemMock.mockResolvedValue(404)

    const result = await savedVariableTemplateTag.run(context, 'statusCode')

    expect(result).toEqual(404)
    expect(storeGetItemMock).toHaveBeenLastCalledWith('variable-statusCode')
  })
})
