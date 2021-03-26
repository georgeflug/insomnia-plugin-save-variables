export type Header = {
  name: string
  value: string
}

export type RequestContextHeaders = {
  getHeaders(): Header[]
  getHeader(name: string): string | null
  hasHeader(name: string): boolean
  removeHeader(name: string): void
  setHeader(name: string, value: string): void
  addHeader(name: string, value: string): void
}

export type RequestContext = RequestContextHeaders & {
  getId(): string
  getName(): string
  getUrl(): string
  setUrl(url: string): void
  getMethod(): string
  getParameter(name: string): string | null
  getParameters(): Array<{ name: string; value: string }>
  setParameter(name: string, value: string): void
  hasParameter(name: string): boolean
  addParameter(name: string, value: string): void
  removeParameter(name: string): void
  setBodyText(text: string): void
  getBodyText(): string
  setCookie(name: string, value: string): void
  getEnvironmentVariable(name: string): unknown
  getEnvironment(): Record<string, unknown>
  setAuthenticationParameter(string: unknown): void
  getAuthentication(): Record<string, unknown>
  settingSendCookies(enabled: boolean): void
  settingStoreCookies(enabled: boolean): void
  settingEncodeUrl(enabled: boolean): void
  settingDisableRenderRequestBody(enabled: boolean): void
}
