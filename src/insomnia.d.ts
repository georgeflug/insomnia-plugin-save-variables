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
    }>,
    run?: (context: unknown, ...args: unknown[]) => Promise<unknown>
  }
}
