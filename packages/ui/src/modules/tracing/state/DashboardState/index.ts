import { Container } from 'unstated';
import { IGraphDescription, INode, IEdge, IEdgeWithNodes } from '../../model/graph';
import { showNode, showEdge, hideEdge, hideNode } from '../../logic/graph';
import { Nullable } from '../../common/typings';

export interface IFilter {
  edge: {
    types: string[],
  },
  node: {
    types: string[],
  },
}

interface IDashboardState {
  searchText: string;
  loading: boolean;
  graph: Nullable<IGraphDescription>;
  showCard: boolean;
  selectedEdgeId: null | string;
  selectedNodeId: null | string;
  filter: IFilter
  showFilter: boolean
}

export class DashboardState extends Container<IDashboardState> {
  public state = {
    searchText: '',
    loading: false,
    graph: null,
    showCard: false,
    selectedEdgeId: '',
    selectedNodeId: '',
    showFilter: false,
    filter: {
      edge: {
        types: [] as string[],
      },
      node: {
        types: [] as string[],
      },
    },
  }

  public fetchGraph = async () => {
    // const response = await client.query<IGraphResponse>({
    //   query: GRAPH_QUERY,
    // })
    // console.log(response.data)
    // const internalGraph = externalGraphToInternalGraph(response.data.graph)
    // console.log(internalGraph)

    // this.setState({
    //   graph: internalGraph,
    // })
  }

  public setSearchText = (searchText: string) => this.setState({
    searchText,
  })

  private nodeFilter = (node: INode) => {
    const { types } = this.state.filter.node
    const shouldShow = types.length === 0 || types.indexOf(node.type) !== -1
    return shouldShow ? showNode(node) : hideNode(node)
  }

  private edgeFilter = (edge: IEdge) => {
    const { types } = this.state.filter.edge
    const shouldShow = types.length === 0 || types.indexOf(edge.type) !== -1
    return shouldShow ? showEdge(edge) : hideEdge(edge)
  }

  public getFilteredGraph = (): IGraphDescription => {
    if (!this.state.graph) {
      return null
    }
    const { nodes, edges } = this.state.graph

    const g =  {
      nodes: nodes.map(this.nodeFilter),
      edges: edges.map(this.edgeFilter),
    }
    return g
  }

  public toggleCardVisibility = () => this.setState({
    showCard: !this.state.showCard,
  })

  public submit = () => {
    alert('serach')
  }

  public selectEdge = (edgeId: string) => this.setState({
    selectedEdgeId: edgeId,
  })

  public deselectEdge = () => this.setState({
    selectedEdgeId: null,
  })

  public selectNode = (nodeId: string) => this.setState({
    selectedNodeId: nodeId,
  })

  public deselectNode = () => this.setState({
    selectedNodeId: null,
  })

  public getSelectedEdge = (): IEdgeWithNodes | null => {
    if (!this.state.selectedEdgeId) {
      return null
    }
    const edge = this.getEdgeById(this.state.selectedEdgeId)
    const from = this.getNodeById(edge.from as string)
    return {
      ...edge,
      from,
      to: this.getNodeById(edge.to as string),
    }
  }

  public getSelectedNode = (): INode | null => {
    if (!this.state.selectedNodeId) {
      return null
    }
    return this.getNodeById(this.state.selectedNodeId)
  }

  private getEdgeById = (edgeId: string): Nullable<IEdge> => {
    if (!this.state.graph) { return null }
    return this.state.graph.edges.find((edge) => edge.id === edgeId)
  }

  private getNodeById = (nodeId: string): Nullable<INode> => {
    if (!this.state.graph) { return null }
    return this.state.graph.nodes.find((node) => node.id === nodeId)
  }

  public setFilterNodeTypes = (types: string[]) => this.setState((state) => ({
    filter: {
      ...state.filter,
      node: {
        ...state.filter.node,
        types,
      },
    },
  }))

  public setFilterEdgeTypes = (types: string[]) => this.setState((state) => ({
    filter: {
      ...state.filter,
      edge: {
        ...state.filter.edge,
        types,
      },
    },
  }))

  public toggleShowFilter = () => this.setState({
    showFilter: !this.state.showFilter,
  })
}
