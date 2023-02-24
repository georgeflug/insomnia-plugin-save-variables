export interface ValueExtractor {
  type: string
  displayName: string
  argumentName?: string
  extract: (sourceValue: string, extractionArgument: string) => Promise<string | null | undefined>
}
