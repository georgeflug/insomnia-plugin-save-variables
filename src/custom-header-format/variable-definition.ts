export type VariableDefinition = {
  variableName: string
  attribute: AttributeType
  path: string
  workspaceId: string
}

export type AttributeType = 'body' | 'header'
