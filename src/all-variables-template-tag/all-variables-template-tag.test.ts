import { createMockStore } from '../insomnia/mocks/store-mock'
import { TemplateRunContext } from '../insomnia/types/template-context'
import { allVariablesTemplateTag } from './all-variables-template-tag'

describe('All Variables Template Tag', () => {
  const store = createMockStore()
  const context = ({
    store,
  } as Partial<TemplateRunContext>) as TemplateRunContext

  it('should return the requested variable', async () => {
    await store.setItem('variable-firstVariable', 'firstValue')
    await store.setItem('variable-secondVariable', 'secondValue')
    await store.setItem('somethingElse', 'someValue')

    const result = await allVariablesTemplateTag.run(context)

    const parsed = JSON.parse(result as string)
    expect(parsed).toEqual({
      firstVariable: 'firstValue',
      secondVariable: 'secondValue',
    })
  })
})
