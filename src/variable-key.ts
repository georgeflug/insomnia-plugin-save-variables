import { base64Encode, base64Decode } from './base64-util'

export type VariableKeyParts = {
  workspaceId: string
  variableName: string
}

export function getVariableKey(workspaceId: string, variableName: string): string {
  return `variable-${base64Encode(workspaceId)}-${base64Encode(variableName)}`
}

export function parseVariableKey(key: string): VariableKeyParts {
  const parts = key.split('-')
  return {
    workspaceId: base64Decode(parts[1]),
    variableName: base64Decode(parts[2]),
  }
}
