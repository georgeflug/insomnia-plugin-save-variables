export const templateTags = [{
  name: 'random',
  displayName: 'Random Integer',
  description: 'Generate random things',
  args: [
      {
          displayName: 'Minimum',
          description: 'Minimum potential value',
          type: 'number',
          defaultValue: 0
      }, 
      {
          displayName: 'Maximum',
          description: 'Maximum potential value',
          type: 'number',
          defaultValue: 100
      }
  ],
  async run (context: unknown, min: number, max: number): Promise<unknown> {
      return Math.round(min + Math.random() * (max - min));
  }
}] as Insomnia.TemplateTag[]

export const requestHooks = [
    (context: Insomnia.RequestHookContext) => {
        console.log('Request hook fired!')
    }
] as Insomnia.RequestHook[]
