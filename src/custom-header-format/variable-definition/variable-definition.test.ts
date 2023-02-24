import {
  createVariableDefinitionHeader,
  isVariableDefinitionHeader,
  parseVariableDefinitionHeader,
  VariableDefinition,
} from './variable-definition'

describe('Variable Definition Header Format', () => {
  it('should create and parse variable definition header', () => {
    const variableDefinition = {
      variableName: 'test',
      source: 'responseBody',
      sourceArg: '',
      extractor: 'json',
      extractorArg: '$.test',
      workspaceId: 'wrk_4efc4e7c4dea494ebb4d0280138c8893',
    } as VariableDefinition

    const header = createVariableDefinitionHeader(variableDefinition)
    const parsed = parseVariableDefinitionHeader(header)
    const isVariableDefinition = isVariableDefinitionHeader(header)

    expect(parsed).toEqual(variableDefinition)
    expect(isVariableDefinition).toEqual(true)
  })

  it('should create and parse variable definition header with dashes in it', () => {
    const variableDefinition = {
      variableName: 'my-test-variable',
      source: 'responseHeader',
      sourceArg: 'X-My-Header',
      extractor: 'static',
      extractorArg: '',
      workspaceId: 'wrk_4efc4e7c4dea4-94ebb4d02-80138c8893',
    } as VariableDefinition

    const header = createVariableDefinitionHeader(variableDefinition)
    const parsed = parseVariableDefinitionHeader(header)
    const isVariableDefinition = isVariableDefinitionHeader(header)

    expect(parsed).toEqual(variableDefinition)
    expect(isVariableDefinition).toEqual(true)
  })

  it('should not consider ordinary headers to be variable definition headers', () => {
    expect(isVariableDefinitionHeader('Authorization')).toEqual(false)
    expect(isVariableDefinitionHeader('Content-Type')).toEqual(false)
    expect(isVariableDefinitionHeader('X-Delete-Variable-blabla')).toEqual(false)
  })
})
