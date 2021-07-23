import { AttributeType, VariableDefinition } from './variable-definition'

const headerPrefix = 'X-Save-Variable'

export function isCustomHeader(headerName: string): boolean {
  return headerName.startsWith(headerPrefix)
}

export function createCustomHeader(variableDefinition: VariableDefinition): string {
  const name = base64Encode(variableDefinition.variableName)
  const attribute = base64Encode(variableDefinition.attribute)
  const path = base64Encode(variableDefinition.path)
  return `${headerPrefix}-${name}-${attribute}-${path}`
}

export function parseCustomHeader(headerName: string): VariableDefinition {
  const parts = headerName.split('-')
  return {
    variableName: base64Decode(parts[3]),
    attribute: base64Decode(parts[4]) as AttributeType,
    path: base64Decode(parts[5]),
  }
}

function base64Encode(data: string): string {
  return Buffer.from(data).toString('base64')
}

function base64Decode(data: string): string {
  return Buffer.from(data, 'base64').toString()
}
