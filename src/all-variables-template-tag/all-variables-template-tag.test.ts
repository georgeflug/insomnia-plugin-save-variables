import { allVariablesTemplateTag } from './all-variables-template-tag'

describe('All Variables Template Tag', () => {
  const storeGetAllItemsMock = jest.fn()
  const context = ({
    store: ({
      all: storeGetAllItemsMock,
    } as Partial<Insomnia.StoreContext>) as Insomnia.StoreContext,
  } as Partial<Insomnia.TemplateRunContext>) as Insomnia.TemplateRunContext

  it('should return the requested variable', async () => {
    storeGetAllItemsMock.mockResolvedValue([
      {
        key: 'variable-firstVariable',
        value: 'firstValue',
      },
      {
        key: 'variable-secondVariable',
        value: 'secondValue',
      },
      {
        key: 'somethingElse',
        value: 'someValue',
      },
    ])

    const result = await allVariablesTemplateTag.run(context)

    const parsed = JSON.parse(result as string)
    expect(parsed).toEqual({
      firstVariable: 'firstValue',
      secondVariable: 'secondValue',
    })
  })
})
