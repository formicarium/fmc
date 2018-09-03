import { request } from 'graphql-request'
import { Variables } from 'graphql-request/dist/src/types'

export interface IGraphQLCLient {
  request<T extends any>(url: string, query: string, variables?: Variables): Promise<T>
}

export class GraphQLClient implements IGraphQLCLient {
  public request = <T extends any>(url: string, query: string, variables?: Variables): Promise<T> => {
    return request(url, query, variables)
  }
}

export const graphqlClient = new GraphQLClient()
