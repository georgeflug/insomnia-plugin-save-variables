import { allVariablesTemplateTag } from './all-variables-template-tag/all-variables-template-tag'
import { definitionTemplateTag } from './definition-template-tag/definition-template-tag'
import { variableDeclarationHeaderRequestHook } from './request-hook/request-hook'
import { variableSavingResponseHook } from './response-hook/response-hook'
import { savedVariableTemplateTag } from './variable-template-tag/variable-template-tag'

export const templateTags = [
  definitionTemplateTag,
  savedVariableTemplateTag,
  allVariablesTemplateTag,
] as Insomnia.TemplateTag[]

export const requestHooks = [variableDeclarationHeaderRequestHook] as Insomnia.RequestHook[]

export const responseHooks = [variableSavingResponseHook] as Insomnia.ResponseHook[]
