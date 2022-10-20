import { allVariablesTemplateTag } from './all-variables-template-tag/all-variables-template-tag'
import { definitionTemplateTag } from './definition-template-tag/definition-template-tag'
import { RequestHook } from './insomnia/types/request-hook'
import { ResponseHook } from './insomnia/types/response-hook'
import { TemplateTag } from './insomnia/types/template-tag'
import { variableDeclarationHeaderRequestHook } from './request-hook/variable-definition/request-hook'
import { variableSavingResponseHook } from './response-hook/response-hook'
import { savedVariableTemplateTag } from './variable-template-tag/variable-template-tag'

export const templateTags = [definitionTemplateTag, savedVariableTemplateTag, allVariablesTemplateTag] as TemplateTag[]

export const requestHooks = [variableDeclarationHeaderRequestHook] as RequestHook[]

export const responseHooks = [variableSavingResponseHook] as ResponseHook[]
