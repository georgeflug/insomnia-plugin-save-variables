import { ValueExtractor } from './value-extractor'
import { search } from 'jmespath'

export const valueExtractorJmesPath: ValueExtractor = {
  type: 'jmesPath',
  displayName: 'JMESPath',
  argumentName: 'JMESPath Query',
  extract: async (sourceValue: string, extractionArgument: string): Promise<string | null | undefined> => {
    const object = JSON.parse(sourceValue)
    return search(object, extractionArgument)
  },
}
