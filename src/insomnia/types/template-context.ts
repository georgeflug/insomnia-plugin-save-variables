import { AppContext } from './app-context'
import { StoreContext } from './store-context'

export type TemplateActionContext = {
  store: StoreContext
}

export type TemplateRunContext = {
  app: AppContext
  store: StoreContext
}
