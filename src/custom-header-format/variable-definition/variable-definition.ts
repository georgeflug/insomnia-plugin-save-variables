import { createCustomHeader, parseCustomHeader } from '../base/custom-header-format'

export type VariableDefinition = {
  variableName: string
  attribute: AttributeType
  path: string
  workspaceId: string
}

export type AttributeType = 'body' | 'header'

const headerPrefix = 'X-Save-Variable'

export function isVariableDefinitionHeader(headerName: string): boolean {
  return headerName.startsWith(headerPrefix)
}

export function createVariableDefinitionHeader(variableDefinition: VariableDefinition): string {
  return createCustomHeader(headerPrefix, [
    variableDefinition.workspaceId,
    variableDefinition.variableName,
    variableDefinition.attribute,
    variableDefinition.path,
  ])
}

export function parseVariableDefinitionHeader(headerName: string): VariableDefinition {
  const parts = parseCustomHeader(headerName, headerPrefix)
  return {
    workspaceId: parts[0],
    variableName: parts[1],
    attribute: parts[2] as AttributeType,
    path: parts[3],
  }
}
