import { IEdge, INode, NodeType, IGraphDescription, EventType } from '../model/graph';
import { IExternalGraph } from '../graphql/queries/get-graph';

export const hideEdge = (edge: IEdge): IEdge => ({
  ...edge,
  hidden: true,
})
export const hideNode = (node: INode): INode => ({
  ...node,
  hidden: true,
})

export const showEdge = (edge: IEdge): IEdge => ({
  ...edge,
  hidden: false,
})
export const showNode = (node: INode): INode => ({
  ...node,
  hidden: false,
})

export const externalGraphToInternalGraph = (externalGraph: IExternalGraph): IGraphDescription => {
  return {
    nodes: externalGraph.nodes.map((node) => ({
      id: node.id,
      label: node.name,
      type: node.type.toUpperCase() as NodeType,
      group: node.type.toUpperCase(),
      hidden: false,
    })),
    edges: externalGraph.edges.map((edge) => ({
      id: `${Math.random() * 1000000}`,
      from: edge.source.id,
      to: edge.target.id,
      label: edge.event.type,
      type: edge.event.type.toUpperCase() as EventType,
      hidden: false,
    })),
  }
}
