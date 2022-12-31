import { valueExtractorHeader } from './value-extractor-header'
import { valueExtractorJson } from './value-extractor-json'
import { valueExtractorStatic } from './value-extractor-static'

export const allValueExtractors = [valueExtractorJson, valueExtractorHeader, valueExtractorStatic]
