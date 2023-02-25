import {
  isVariableDefinitionHeader,
  parseVariableDefinitionHeader,
} from '../../custom-header-format/variable-definition/variable-definition'
import { pluginGlobal } from '../../global/plugin-global'
import { RequestHook } from '../../insomnia/types/request-hook'
import { RequestHookContext } from '../../insomnia/types/request-hook-context'
import { log, LogLevel } from '../../logger/log'

export const variableDeclarationHeaderRequestHook: RequestHook = async (context: RequestHookContext) => {
  const headers = context.request.getHeaders()
  const customHeaderNames = headers.map(header => header.name).filter(isVariableDefinitionHeader)
  customHeaderNames.forEach(name => context.request.removeHeader(name))
  const variableDefinitions = customHeaderNames.map(parseVariableDefinitionHeader)
  pluginGlobal.currentRequestVariableDefinitions = variableDefinitions
  pluginGlobal.currentRequestContext = context
  variableDefinitions.forEach(def => {
    log(LogLevel.INFO, `Virtual Header for variable "${def.variableName}" detected.`)
  })
}
