// DEPREACTED
export enum EventType {
  KAFKA = 'KAFKA',
  HTTP_IN = 'HTTP-IN',
}

export enum EdgeType {
  KAFKA = 'KAFKA',
  HTTP = 'HTTP',
}

export enum NodeType {
  SERVICE = 'SERVICE',
  TOPIC = 'TOPIC',
}
export interface INode {
  id: string,
  label: string,
  type: NodeType,
  hidden?: boolean,
  group?: string,
}

export interface IEdge {
  id: string,
  from: string,
  to: string
  label: string
  type: EdgeType
  color?: string
  hidden?: boolean

  traceId: string
  spanId: string
  parentId?: string
}

export interface IEdgeWithNodes {
  id: string,
  from: INode,
  to: INode
  label: string
  type: EventType
  hidden: boolean
}
export interface IGraphDescription {
  nodes: INode[]
  edges: IEdge[]
}
