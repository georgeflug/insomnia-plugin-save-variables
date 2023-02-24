import { ValueExtractor } from './value-extractor'

export const valueExtractorStatic: ValueExtractor = {
  type: 'static',
  displayName: 'Static Value',
  argumentName: 'Value',
  extract: async (_sourceValue: string, extractionArgument: string): Promise<string | null | undefined> => {
    return extractionArgument
  },
}
