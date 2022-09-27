import { base64Decode, base64Encode } from '../../base64-util'

export function createCustomHeader(headerPrefix: string, values: string[]): string {
  const encodedValues = values.map(v => base64Encode(v))
  return `${headerPrefix}-${encodedValues.join('-')}`
}

export function parseCustomHeader(headerName: string, headerPrefix: string): string[] {
  const data = headerName.substring(`${headerPrefix}-`.length)
  const parts = data.split('-')
  return parts.map(p => base64Decode(p))
}
