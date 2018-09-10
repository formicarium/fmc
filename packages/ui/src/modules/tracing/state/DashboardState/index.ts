import { Container } from 'unstated';
interface IDashboardState {
  showFilter: boolean
}

export class DashboardState extends Container<IDashboardState> {
  public state = {
    showFilter: false,

  }
  public toggleShowFilter = () => this.setState({
    showFilter: !this.state.showFilter,
  })
}
