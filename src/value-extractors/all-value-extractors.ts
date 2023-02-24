import { valueExtractorJson } from './value-extractor-json'
import { valueExtractorStatic } from './value-extractor-raw'
import { valueExtractorXml } from './value-extractor-xml'

export const allValueExtractors = [valueExtractorJson, valueExtractorStatic, valueExtractorXml]
