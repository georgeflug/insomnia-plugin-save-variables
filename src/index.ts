import { allVariablesTemplateTag } from './all-variables-template-tag/all-variables-template-tag'
import { definitionTemplateTag } from './definition-template-tag/definition-template-tag'
import { deletionTemplateTag } from './deletion-template-tag/deletion-template-tag'
import { RequestHook } from './insomnia/types/request-hook'
import { ResponseHook } from './insomnia/types/response-hook'
import { TemplateTag } from './insomnia/types/template-tag'
import { deletionHeaderRequestHook } from './request-hook/deletion/request-hook'
import { variableDeclarationHeaderRequestHook } from './request-hook/variable-definition/request-hook'
import { deletionResponseHook } from './response-hook/deletion/response-hook'
import { variableSavingResponseHook } from './response-hook/variable-definition/response-hook'
import { savedVariableTemplateTag } from './variable-template-tag/variable-template-tag'

export const templateTags = [
  definitionTemplateTag,
  deletionTemplateTag,
  savedVariableTemplateTag,
  allVariablesTemplateTag,
] as TemplateTag[]

export const requestHooks = [variableDeclarationHeaderRequestHook, deletionHeaderRequestHook] as RequestHook[]

export const responseHooks = [variableSavingResponseHook, deletionResponseHook] as ResponseHook[]
