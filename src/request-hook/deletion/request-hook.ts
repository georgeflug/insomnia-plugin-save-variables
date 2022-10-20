import { isDeletionHeader, parseDeletionHeader } from '../../custom-header-format/deletion/deletion'
import { RequestHook } from '../../insomnia/types/request-hook'
import { RequestHookContext } from '../../insomnia/types/request-hook-context'

export const deletionHeaderRequestHook: RequestHook = async (context: RequestHookContext) => {
  const headers = context.request.getHeaders()
  const customHeaderNames = headers.map(header => header.name).filter(isDeletionHeader)
  customHeaderNames.forEach(name => context.request.removeHeader(name))
  const deletions = customHeaderNames.map(parseDeletionHeader)
  await context.store.setItem('variableDeletions', JSON.stringify(deletions))
}
