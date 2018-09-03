import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLClientMock } from '../components/graphql-client.mock'
import { TOP_LEVEL_DOMAIN } from '../const'

const typeDefs = `
type Repo {
  url: String!
}

type Query {
  hello: String!
}

type Mutation {
  createServiceRepo(service: String!): Repo!
}
`

interface ICreateServiceRepoArgs {
  namespace: string,
  service: string,
}

interface IContext {
  tld: string
}

const context: IContext = {
  tld: TOP_LEVEL_DOMAIN,
}

const resolvers = {
  Query: {
    hello: () => {
      console.log('exec')
      return 'Hello'
    },
  },
  Mutation: {
    createServiceRepo: (_: any, values: ICreateServiceRepoArgs) => {
      return {
        // url: `http://git.carlos-rodrigues.${TOP_LEVEL_DOMAIN}/${values.service}.git`,
        url: `http://localhost:6666/${values.service}.git`,
      }
    },
  },
}

const schema = makeExecutableSchema<IContext>({
  typeDefs,
  resolvers,
} as any)
export const hiveMock = new GraphQLClientMock(schema, context)
