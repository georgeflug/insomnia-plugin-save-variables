import { valueSourceRequestBody } from './value-source-request-body'
import { valueSourceRequestHeader } from './value-source-request-header'
import { valueSourceResponseBody } from './value-source-response-body'
import { valueSourceResponseCode } from './value-source-response-code'
import { valueSourceResponseHeader } from './value-source-response-header'
import { valueSourceStatic } from './value-source-static'

export const allValueSources = [
  valueSourceResponseBody,
  valueSourceRequestBody,
  valueSourceResponseHeader,
  valueSourceRequestHeader,
  valueSourceResponseCode,
  valueSourceStatic,
]
