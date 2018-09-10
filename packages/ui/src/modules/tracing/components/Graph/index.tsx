import React from 'react'
import VisGraph from 'react-graph-vis'
import { IGraphDescription } from '../../model/graph';

export const GROUPS = {
  SERVICES: 'SERVICE',
  TOPICS: 'TOPIC',
}

const options = {
  autoResize: true,
  width: '100%',
  height: '100%',
  nodes: {
    chosen: false,
    shape: 'dot',
    size: 30,
    font: {
      size: 20,
      color: '#000',
      face: 'Open Sans',
    },
    color: {
      background: '#612F74',
      // border: '#bf40bf',
    },
    borderWidth: 0,
  },
  interaction: {
    selectConnectedEdges: false,
    multiselect: true,
  },
  physics: {
    solver: 'repulsion',
    repulsion: {
      nodeDistance: 500,
    },
  },
  edges: {
    width: 4,
    color: {
      color: '#d3d3d3',
    },
    font: {
      color: '#000',
      strokeWidth: 0,
    },
    smooth: {
      type: 'dynamic',
      enabled: true,
      roundness: 1,
    },
  },
  groups: {
    [GROUPS.SERVICES]: {
      color: {
        border: '#59CDEA',
        background: '#364550',
      },
    },
    [GROUPS.TOPICS]: {
      color: {
        border: '#2ecc71',
        background: '#364550',
      },
    },
    hidden: {
      color: {
        background: 'transparent',
      },
    },
  },
};

export interface IGraph {
  graph: IGraphDescription
  onSelectEdge: (edgeId: string) => void;
  onDeselectEdge: () => void;
  onSelectNode: (nodeId: string) => void;
  onDeselectNode: () => void;
}

interface ISelectEdgeEvent {
  edges: string[]
}

interface ISelectNodeEvent {
  nodes: string[]
  edges: string[]
}

const buildVisGraph = (graph: IGraphDescription) => {
  return {
    edges: graph.edges.map((edge) => ({
      ...edge,
      color: {
        ...edge.color && { color: edge.color },
      },
    })),
    nodes: graph.nodes.map((node) => ({
      ...node,
      group: node.type,
    })),
  }
}
export class Graph extends React.Component<IGraph> {
  public shouldComponentUpdate(nextProps: IGraph) {
    return nextProps.graph !== this.props.graph
  }
  public render() {
    const {
      graph,
      children,
      onSelectEdge,
      onDeselectEdge,
      onSelectNode,
      onDeselectNode,
    } = this.props
    return (
      <VisGraph
        graph={buildVisGraph(graph)}
        events={{
          selectEdge: (ev: ISelectEdgeEvent) => {
            const [first, ...rest] = ev.edges
            onSelectEdge(first)
          },
          deselectEdge: () => {
            onDeselectEdge()
          },
          selectNode: (ev: ISelectNodeEvent) => {
            const [first, ...rest] = ev.nodes
            onSelectNode(first)
          },
          deselectNode: (e: ISelectNodeEvent) => {
            onDeselectNode()
          },
        }}
        options={options}
        children={children}
      />
    )
  }
}
