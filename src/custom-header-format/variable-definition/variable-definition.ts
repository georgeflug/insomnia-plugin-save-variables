import { createCustomHeader, parseCustomHeader } from '../base/custom-header-format'

export type VariableDefinition = {
  variableName: string
  source: string
  sourceArg?: string
  extractor: string
  extractorArg?: string
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
    variableDefinition.source,
    variableDefinition.sourceArg ?? '',
    variableDefinition.extractor,
    variableDefinition.extractorArg ?? '',
  ])
}

export function parseVariableDefinitionHeader(headerName: string): VariableDefinition {
  const parts = parseCustomHeader(headerName, headerPrefix)
  return {
    workspaceId: parts[0],
    variableName: parts[1],
    source: parts[2],
    sourceArg: parts[3],
    extractor: parts[4],
    extractorArg: parts[5],
  }
}
