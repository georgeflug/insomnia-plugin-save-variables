import { valueExtractorHeader } from './value-extractor-header'
import { valueExtractorJson } from './value-extractor-json'
import { valueExtractorStatic } from './value-extractor-static'
import { valueExtractorXml } from './value-extractor-xml'

export const allValueExtractors = [valueExtractorJson, valueExtractorHeader, valueExtractorStatic, valueExtractorXml]
