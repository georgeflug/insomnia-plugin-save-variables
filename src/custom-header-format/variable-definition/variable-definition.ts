import { createCustomHeader, parseCustomHeader } from '../base/custom-header-format'

export type VariableDefinition = {
  variableName: string
  type: string
  arg: string
  workspaceId: string
}

const headerPrefix = 'X-Save-Variable'

export function isVariableDefinitionHeader(headerName: string): boolean {
  return headerName.startsWith(headerPrefix)
}

export function createVariableDefinitionHeader(variableDefinition: VariableDefinition): string {
  return createCustomHeader(headerPrefix, [
    variableDefinition.workspaceId,
    variableDefinition.variableName,
    variableDefinition.type,
    variableDefinition.arg,
  ])
}

export function parseVariableDefinitionHeader(headerName: string): VariableDefinition {
  const parts = parseCustomHeader(headerName, headerPrefix)
  return {
    workspaceId: parts[0],
    variableName: parts[1],
    type: parts[2],
    arg: parts[3],
  }
}
