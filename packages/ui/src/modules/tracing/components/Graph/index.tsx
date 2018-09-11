import React from 'react'
import VisGraph from 'react-graph-vis'
import { IGraphDescription, IEdge } from '../../model/graph';
import R from 'ramda'

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
    hover: true,
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
  onSelectEdge: (edge: IEdge) => void;
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
  return graph
}

export interface IGraphState {
  hovering: boolean
}

type VisNetwork = any
export class Graph extends React.Component<IGraph, IGraphState> {
  private network: VisNetwork
  public state = {
    hovering: false
  }
  public shouldComponentUpdate(nextProps: IGraph, nextState: IGraphState) {
    return nextProps.graph !== this.props.graph || this.state !== nextState
  }

  private selectEdge = (ev: ISelectEdgeEvent) => {
    const edgeId = ev.edges[0]
    if (!edgeId) {
      return
    }
    const edge = R.find((ed) => ed.id === edgeId, this.props.graph.edges)
    this.props.onSelectEdge(edge)
  }

  private getNetwork = (network: VisNetwork) => {
    this.network = network
  }

  private hoverEdge = () => {
    this.setState({
      hovering: true
    })
  }
  private blurEdge = () => {
    this.setState({
      hovering: false
    })
  }

  private deselectEdge = () => {
    this.props.onDeselectEdge()
  }
  private handlers = {
    hoverEdge: this.hoverEdge,
    blurEdge: this.blurEdge,
    selectEdge: this.selectEdge,
    deselectEdge: this.deselectEdge,
  }
  public render() {
    const {
      graph,
      children,
    } = this.props
    return (
      <div style={{
        cursor: this.state.hovering ? 'pointer' : 'inherit'
      }}>
        <VisGraph
          getNetwork={this.getNetwork}
          graph={buildVisGraph(graph)}
          events={this.handlers}
          options={options}
          children={children}
        />
      </div>

    )
  }
}
