import { VariableDefinition } from '../custom-header-format/variable-definition/variable-definition'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'
import { ValueExtractor } from './value-extractor'
import { DOMParser } from 'xmldom'
import { select } from 'xpath'

export const valueExtractorXml: ValueExtractor = {
  type: 'bodyXml',
  display: {
    name: 'Body Attribute (XML)',
    description: 'value of response body',
    argument: 'Response XPath',
  },
  extractFromResponse: async (
    variableDefinition: VariableDefinition,
    context: ResponseHookContext,
  ): Promise<string | null | undefined> => {
    const body = context.response.getBody()?.toString('utf-8') || ''
    const xmlDoc = new DOMParser().parseFromString(body)
    const nodes = select(variableDefinition.arg, xmlDoc)
    return nodes ? String(nodes) : null
  },
}
