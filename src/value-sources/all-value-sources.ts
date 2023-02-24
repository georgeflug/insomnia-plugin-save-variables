import { valueSourceRequestBody } from './value-source-request-body'
import { valueSourceResponseBody } from './value-source-response-body'
import { valueSourceResponseHeader } from './value-source-response-header'
import { valueSourceStatic } from './value-source-static'

export const allValueSources = [
  valueSourceResponseBody,
  valueSourceRequestBody,
  valueSourceResponseHeader,
  valueSourceStatic,
]
