import { SpanType } from '~/modules/tracing/graphql/queries/events';

export interface INode {
  id: string,
  label: string,
  hidden?: boolean,
  group?: string,
}

export interface IEdge {
  id: string,
  from: string,
  to: string
  label: string
  color?: string
  hidden?: boolean

  metadata: {
    fromEvent: string
    toEvent: string
    type: SpanType
  }
}
export interface IGraphDescription {
  nodes: INode[]
  edges: IEdge[]
}
