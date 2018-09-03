import gql from 'graphql-tag';

export interface IExternalGraph {
  nodes: Array<{
    id: string
    name: string
    type: 'topic' | 'service',
  }>,
  edges: Array<{
    source: {
      id: string,
    },
    target: {
      id: string,
    },
    event: {
      type: 'http' | 'kafka',
    },
  }>
}
export interface IGraphResponse {
  graph: IExternalGraph,
}

export const GRAPH_QUERY = gql`
query {
  graph {
    nodes {
      id
      name
      type
    }
    edges{
      event {
          type
          payload
          producedAt
        }

        source {
          id
        }
        target {
          id
      }
    }
  }
}
`
