import { AppContext } from './app-context'
import { ResponseContext } from './response-context'
import { StoreContext } from './store-context'

export type ResponseHookContext = {
  app: AppContext
  response: ResponseContext
  store: StoreContext
}
