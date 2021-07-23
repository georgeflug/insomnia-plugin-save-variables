export type VariableDefinition = {
  variableName: string
  attribute: AttributeType
  path: string
}

export type AttributeType = 'body' | 'header'
