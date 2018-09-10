import { Container } from 'unstated';
interface IDashboardState {
  showFilter: boolean
  expandedSections: {
    filter: boolean,
    spanExplorer: boolean,
    eventList: boolean,
  }
}

export class DashboardState extends Container<IDashboardState> {
  public state = {
    showFilter: false,
    expandedSections: {
      filter: false,
      spanExplorer: false,
      eventList: false,
    },
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
}
