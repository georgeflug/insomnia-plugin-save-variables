import { createDeletionHeader, DeletionDefinition, isDeletionHeader, parseDeletionHeader } from './deletion'

describe('Deletion Header Format', () => {
  it('should create and parse deletion header', () => {
    const deletionDefinition = {
      variableName: 'test',
      statusCodeMatcher: '2..',
      workspaceId: 'wrk1234',
    } as DeletionDefinition

    const header = createDeletionHeader(deletionDefinition)
    const parsed = parseDeletionHeader(header)
    const isDeletion = isDeletionHeader(header)

    expect(parsed).toEqual(deletionDefinition)
    expect(isDeletion).toEqual(true)
  })

  it('should create and parse deletion header with dashes in it', () => {
    const deletionDefinition = {
      variableName: 'test-var-name',
      statusCodeMatcher: '2..',
      workspaceId: 'wrk1234',
    } as DeletionDefinition

    const header = createDeletionHeader(deletionDefinition)
    const parsed = parseDeletionHeader(header)
    const isDeletion = isDeletionHeader(header)

    expect(parsed).toEqual(deletionDefinition)
    expect(isDeletion).toEqual(true)
  })

  it('should not consider ordinary headers to be deletion headers', () => {
    expect(isDeletionHeader('Authorization')).toEqual(false)
    expect(isDeletionHeader('Content-Type')).toEqual(false)
    expect(isDeletionHeader('X-Save-Variable-blabla')).toEqual(false)
  })
})
