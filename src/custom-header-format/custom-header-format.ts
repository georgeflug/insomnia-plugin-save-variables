import { base64Decode, base64Encode } from '../base64-util'
import { AttributeType, VariableDefinition } from './variable-definition'

const headerPrefix = 'X-Save-Variable'

export function isCustomHeader(headerName: string): boolean {
  return headerName.startsWith(headerPrefix)
}

export function createCustomHeader(variableDefinition: VariableDefinition): string {
  const workspaceId = base64Encode(variableDefinition.workspaceId)
  const name = base64Encode(variableDefinition.variableName)
  const attribute = base64Encode(variableDefinition.attribute)
  const path = base64Encode(variableDefinition.path)
  return `${headerPrefix}-${workspaceId}-${name}-${attribute}-${path}`
}

export function parseCustomHeader(headerName: string): VariableDefinition {
  const parts = headerName.split('-')
  return {
    workspaceId: base64Decode(parts[3]),
    variableName: base64Decode(parts[4]),
    attribute: base64Decode(parts[5]) as AttributeType,
    path: base64Decode(parts[6]),
  }
}
