import {
  createVariableDefinitionHeader,
  VariableDefinition,
} from './custom-header-format/variable-definition/variable-definition'
import { createMockHeaders } from './insomnia/mocks/headers-mock'
import { createMockStore } from './insomnia/mocks/store-mock'
import { RequestHookContext } from './insomnia/types/request-hook-context'
import { ResponseHookContext } from './insomnia/types/response-hook-context'
import { TemplateRunContext } from './insomnia/types/template-context'
import { variableDeclarationHeaderRequestHook } from './request-hook/variable-definition/request-hook'
import { variableSavingResponseHook } from './response-hook/variable-definition/response-hook'
import { savedVariableTemplateTag } from './variable-template-tag/variable-template-tag'
import { createDeletionHeader, DeletionDefinition } from './custom-header-format/deletion/deletion'
import { deletionHeaderRequestHook } from './request-hook/deletion/request-hook'
import { deletionResponseHook } from './response-hook/deletion/response-hook'

jest.mock('sweetalert', () => ({}))

describe('Test through entire system', () => {
  it('should save variable using request header and response hook', async () => {
    const ticketNumber = 'ID-123'
    const workspaceId = 'wrk_23232323'
    const context = {
      request: createMockHeaders(),
      response: {
        getBody: jest.fn().mockReturnValue(`{"ticket": "${ticketNumber}","other":"doesNotMatter"}`),
      },
      store: createMockStore(),
      meta: {
        workspaceId,
      },
    }
    const variableDefinition: VariableDefinition = {
      variableName: 'ticketNumber',
      type: 'bodyJson',
      arg: '$.ticket',
      workspaceId,
    }
    context.request.setHeader(createVariableDefinitionHeader(variableDefinition), 'doesNotMatter')

    await variableDeclarationHeaderRequestHook((context as unknown) as RequestHookContext)
    await variableSavingResponseHook((context as unknown) as ResponseHookContext)
    const result = await savedVariableTemplateTag.run((context as unknown) as TemplateRunContext, 'ticketNumber')

    expect(result).toEqual(ticketNumber)
  })

  it('should not be able to access variable that was saved in a different workspace', async () => {
    const ticketNumber = 'ID-123'
    const workspaceId = 'wrk_23232323'
    const context = {
      request: createMockHeaders(),
      response: {
        getBody: jest.fn().mockReturnValue(`{"ticket": "${ticketNumber}","other":"doesNotMatter"}`),
      },
      store: createMockStore(),
      meta: {
        workspaceId,
      },
    }
    const variableDefinition: VariableDefinition = {
      variableName: 'ticketNumber',
      type: 'bodyJson',
      arg: '$.ticket',
      workspaceId,
    }
    context.request.setHeader(createVariableDefinitionHeader(variableDefinition), 'doesNotMatter')
    const otherWorkspaceContext = {
      ...context,
      meta: {
        workspaceId: 'wrk_8989898998',
      },
    }

    await variableDeclarationHeaderRequestHook((context as unknown) as RequestHookContext)
    await variableSavingResponseHook((context as unknown) as ResponseHookContext)
    const result = await savedVariableTemplateTag.run(
      (otherWorkspaceContext as unknown) as TemplateRunContext,
      'ticketNumber',
    )

    expect(result).toEqual('No variable with name "ticketNumber". No variables have been set yet.')
  })

  it('should not be able to access variable that was deleted', async () => {
    const ticketNumber = 'ID-123'
    const workspaceId = 'wrk_23232323'
    const context = {
      request: createMockHeaders(),
      response: {
        getBody: jest.fn().mockReturnValue(`{"ticket": "${ticketNumber}","other":"doesNotMatter"}`),
        getStatusCode: jest.fn().mockReturnValue(200),
      },
      store: createMockStore(),
      meta: {
        workspaceId,
      },
    }
    const variableDefinition: VariableDefinition = {
      variableName: 'ticketNumber',
      type: 'bodyJson',
      arg: '$.ticket',
      workspaceId,
    }
    const deletionDefinition: DeletionDefinition = {
      variableName: 'ticketNumber',
      statusCodeMatcher: '',
      workspaceId,
    }

    // save value into variable
    context.request.setHeader(createVariableDefinitionHeader(variableDefinition), 'doesNotMatter')
    await variableDeclarationHeaderRequestHook((context as unknown) as RequestHookContext)
    await variableSavingResponseHook((context as unknown) as ResponseHookContext)

    // delete value from variable
    context.request = createMockHeaders()
    context.request.setHeader(createDeletionHeader(deletionDefinition), 'doesNotMatter')
    await deletionHeaderRequestHook((context as unknown) as RequestHookContext)
    await deletionResponseHook((context as unknown) as ResponseHookContext)

    // retrieve value
    const result = await savedVariableTemplateTag.run((context as unknown) as TemplateRunContext, 'ticketNumber')
    expect(result).toEqual('No variable with name "ticketNumber". No variables have been set yet.')
  })
})
