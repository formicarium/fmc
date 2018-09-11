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
  }
}
export interface IGraphDescription {
  nodes: INode[]
  edges: IEdge[]
}
