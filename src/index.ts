import { variableDeclarationHeaderRequestHook } from './request-hook/request-hook'
import { variableSavingResponseHook } from './response-hook/response-hook'
import { savedVariableTemplateTag } from './variable-template-tag/variable-template-tag'

export const templateTags = [savedVariableTemplateTag] as Insomnia.TemplateTag[]

export const requestHooks = [variableDeclarationHeaderRequestHook] as Insomnia.RequestHook[]

export const responseHooks = [variableSavingResponseHook] as Insomnia.ResponseHook[]
