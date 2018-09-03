import { IGraphQLCLient } from './graphql-client'
import { Variables } from 'graphql-request/dist/src/types'
import { GraphQLSchema, execute, GraphQLError } from 'graphql'
import gql from 'graphql-tag'

class MyGraphQLError extends Error {
  public errors: ReadonlyArray<GraphQLError>

  constructor(message: string, errors: ReadonlyArray<GraphQLError>) {
    super(message)
    this.errors = errors
  }
}

export class GraphQLClientMock implements IGraphQLCLient {
  private schema: GraphQLSchema
  private ctx: any

  constructor(schema: GraphQLSchema, ctx: any) {
    this.schema = schema
    this.ctx = ctx
  }
  public request = async <T>(url: string, query: string, variables?: Variables): Promise<T> => {
    const document = gql(query)

    const response = await execute<T>({
      schema: this.schema,
      document,
      variableValues: variables,
      contextValue: this.ctx,
    })

    if (response.errors) {
      throw new MyGraphQLError('error', response.errors)
    }

    if (!response.data) {
      throw new Error('No data after execution')
    }
    return response.data
  }
}
