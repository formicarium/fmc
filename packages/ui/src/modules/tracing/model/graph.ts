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

  traceId?: string
  spanId?: string
  parentId?: string
}
export interface IGraphDescription {
  nodes: INode[]
  edges: IEdge[]
}
