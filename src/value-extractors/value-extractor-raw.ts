import { ValueExtractor } from './value-extractor'

export const valueExtractorStatic: ValueExtractor = {
  type: 'raw',
  displayName: 'Raw Value',
  extract: async (sourceValue: string, _extractionArgument: string): Promise<string | null | undefined> => {
    return sourceValue
  },
}
