import { Container } from 'unstated';
import { IEdge } from '~/modules/tracing/model/graph';
export interface IDashboardState {
  showFilter: boolean
  expandedSections: {
    filter: boolean,
    spanExplorer: boolean,
    eventList: boolean,
  },
  selectedEdge: IEdge | null
}

export class DashboardState extends Container<IDashboardState> {
  constructor() {
    super()
    this.state = {
      showFilter: false,
      expandedSections: {
        filter: false,
        spanExplorer: false,
        eventList: false,
      },
      selectedEdge: null,
    }
  }

  public toggleShowFilter = () => this.setState({
    showFilter: !this.state.showFilter,
  })
  public setExpandedSection = (expandedSectionId: string, open: boolean) => this.setState((state) => ({
    expandedSections: {
      ...state.expandedSections,
      [expandedSectionId]: open,
    },
  }))

  public selectEdge = (edge: IEdge) => this.setState({
    selectedEdge: edge
  })

  public deselectEdge = () => this.setState({
    selectedEdge: null,
  })

  public showDashboard = () => {
    if (this.state.showFilter) {
      this.toggleShowFilter()
    }
    if (this.state.selectedEdge) {
      this.deselectEdge()
    }
  }
}
