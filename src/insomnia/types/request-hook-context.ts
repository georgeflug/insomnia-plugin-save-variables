import { AppContext } from './app-context'
import { RequestContext } from './request-context'
import { StoreContext } from './store-context'

export type RequestHookContext = {
  app: AppContext
  request: RequestContext
  store: StoreContext
}
