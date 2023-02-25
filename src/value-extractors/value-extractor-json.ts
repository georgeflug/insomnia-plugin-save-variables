import { JSONPath } from 'jsonpath-plus'
import { ValueExtractor } from './value-extractor'

export const valueExtractorJson: ValueExtractor = {
  type: 'jsonPath',
  displayName: 'JSONPath',
  argumentName: 'JSONPath Query',
  extract: async (sourceValue: string, extractionArgument: string): Promise<string | null | undefined> => {
    const object = JSON.parse(sourceValue)
    return JSONPath<string>({
      path: extractionArgument,
      json: object,
      wrap: false,
    })
  },
}
