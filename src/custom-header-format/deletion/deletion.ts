import { createCustomHeader, parseCustomHeader } from '../base/custom-header-format'

export type DeletionDefinition = {
  variableName: string
  statusCodeMatcher: string
}

const headerPrefix = 'X-Delete-Variable'

export function isDeletionHeader(headerName: string): boolean {
  return headerName.startsWith(headerPrefix)
}

export function createDeletionHeader(deletionDefinition: DeletionDefinition): string {
  return createCustomHeader(headerPrefix, [deletionDefinition.variableName, deletionDefinition.statusCodeMatcher])
}

export function parseDeletionHeader(headerName: string): DeletionDefinition {
  const parts = parseCustomHeader(headerName, headerPrefix)
  return {
    variableName: parts[0],
    statusCodeMatcher: parts[1],
  }
}
