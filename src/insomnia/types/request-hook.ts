import { RequestHookContext } from './request-hook-context'

export type RequestHook = (context: RequestHookContext) => Promise<void>
