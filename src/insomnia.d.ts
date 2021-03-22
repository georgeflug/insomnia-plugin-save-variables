declare module Insomnia {
  export type TemplateTag = {
    name: string
    displayName: string
    disablePreview?: () => boolean
    description?: string
    deprecated?: boolean
    liveDisplayName?: (args: unknown) => string | undefined
    validate?: (value: any) => string | undefined
    priority?: number
    args: Array<{
      displayName: string
      description?: string
      defaultValue: string | number | boolean
      type: 'string' | 'number' | 'enum' | 'model' | 'boolean'
      
      // Only type === 'string'
      placeholder?: string
  
      // Only type === 'model'
      modelType: string
  
      // Only type === 'enum'
      options: Array<{
        displayName: string
        value: string
        description?: string
        placeholder?: string
      }>
    }>
    actions: Array<{
      name: string
      icon?: string
      run?: (context: unknown) => Promise<void>
    }>
    run?: (context: unknown, ...args: unknown[]) => Promise<unknown>
  }
  export type AppContext = {
    alert(title: string, message?: string): Promise<void>
    prompt(title: string, options?: {
        label?: string
        defaultValue?: string
        submitName?: string
        cancelable?: boolean
      }): Promise<string>
    getPath(name: 'desktop'): string
    showSaveDialog(options: { defaultPath?: string }): Promise<string | null>
  }
  export type RequestContext = {
    getId(): string
    getName(): string
    getUrl(): string
    setUrl(url: string): void
    getMethod(): string
    getHeaders(): Array<{ name: string, value: string }>
    getHeader(name: string): string | null,
    hasHeader(name: string): boolean
    removeHeader(name: string): void
    setHeader(name: string, value: string): void
    addHeader(name: string, value: string): void
    getParameter(name: string): string | null
    getParameters(): Array<{name: string, value: string}>
    setParameter(name: string, value: string): void
    hasParameter(name: string): boolean
    addParameter(name: string, value: string): void
    removeParameter(name: string): void
    setBodyText(text: string): void
    getBodyText(): string
    setCookie(name: string, value: string): void
    getEnvironmentVariable(name: string): any
    getEnvironment(): Object
    setAuthenticationParameter(string: any): void
    getAuthentication(): Object
    setCookie(name: string, value: string): void
    settingSendCookies(enabled: boolean): void
    settingStoreCookies(enabled: boolean): void
    settingEncodeUrl(enabled: boolean): void
    settingDisableRenderRequestBody(enabled: boolean): void
  }
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
  export type StoreContext = {
    hasItem(key: string): Promise<boolean>
    setItem(key: string, value: string): Promise<void>
    getItem(key: string): Promise<string | null>
    removeItem(key: string): Promise<void>
    clear(): Promise<void>
    all(): Promise<Array<{ key: string, value: string }>>
  }
  export type RequestHookContext = {
    app: AppContext
    request: RequestContext
    store: StoreContext
  }
  export type ResponseHookContext = {
    app: AppContext
    response: ResponseContext
    store: StoreContext
  }
  export type RequestHook = (context: RequestHookContext) => Promise<void>
  export type ResponseHook = (context: ResponseHookContext) => Promise<void>
}
