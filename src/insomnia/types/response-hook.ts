import { ResponseHookContext } from './response-hook-context'

export type ResponseHook = (context: ResponseHookContext) => Promise<void>
