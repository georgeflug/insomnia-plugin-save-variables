import { createCustomHeader } from './custom-header-format/custom-header-format'
import { VariableDefinition } from './custom-header-format/variable-definition'
import { createMockHeaders } from './insomnia/mocks/headers-mock'
import { createMockStore } from './insomnia/mocks/store-mock'
import { variableDeclarationHeaderRequestHook } from './request-hook/request-hook'
import { variableSavingResponseHook } from './response-hook/response-hook'
import { savedVariableTemplateTag } from './variable-template-tag/variable-template-tag'

describe('Test through entire system', () => {
  it('should save variable using request header and response hook', async () => {
    const ticketNumber = 'ID-123'
    const context = {
      request: createMockHeaders(),
      response: {
        getBody: jest.fn().mockReturnValue(`{"ticket": "${ticketNumber}","other":"doesNotMatter"}`),
      },
      store: createMockStore(),
    }
    const variableDefinition: VariableDefinition = {
      variableName: 'ticketNumber',
      jsonPath: '$.ticket',
    }
    context.request.setHeader(createCustomHeader(variableDefinition), 'doesNotMatter')

    await variableDeclarationHeaderRequestHook((context as unknown) as Insomnia.RequestHookContext)
    await variableSavingResponseHook((context as unknown) as Insomnia.ResponseHookContext)
    const result = await savedVariableTemplateTag.run(
      (context as unknown) as Insomnia.TemplateRunContext,
      'ticketNumber',
    )

    expect(result).toEqual(ticketNumber)
  })
})
