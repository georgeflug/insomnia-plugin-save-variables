export type ResponseContext = {
  getRequestId(): string
  getStatusCode(): number
  getStatusMessage(): string
  getBytesRead(): number
  getTime(): number
  getBody(): Buffer | null
  setBody(body: Buffer): void
  getHeader(name: string): string | Array<string> | null
  hasHeader(name: string): boolean
}
