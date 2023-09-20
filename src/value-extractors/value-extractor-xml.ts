import { ValueExtractor } from './value-extractor'
import { DOMParser } from '@xmldom/xmldom'
import { select } from 'xpath'

export const valueExtractorXml: ValueExtractor = {
  type: 'xml',
  displayName: 'XPath',
  argumentName: 'XPath',
  extract: async (sourceValue: string, extractionArgument: string): Promise<string | null | undefined> => {
    const xmlDoc = new DOMParser().parseFromString(sourceValue)
    const nodes = select(extractionArgument, xmlDoc)
    return nodes ? String(nodes) : null
  },
}
