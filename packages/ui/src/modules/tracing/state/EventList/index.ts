import { Container } from 'unstated';
import * as R from 'ramda'

export interface IEventListState {
  selectedIndex: number
  cumulative: boolean
  showAll: boolean
}
export class EventListState extends Container<IEventListState> {
  constructor() {
    super()
    this.state = {
      selectedIndex: 0,
      cumulative: false,
      showAll: false,
    }
  }
  public setSelectedIndex = (selectedIndex: number) => this.setState({
    selectedIndex,
  })

  public setCumulative = (cumulative: boolean) => this.setState({
    cumulative,
  })

  public setShowAll = (showAll: boolean) => this.setState({
    showAll,
  })

  public increaseIndex = () => this.setState((state) => ({
    selectedIndex: R.min(R.inc(state.selectedIndex), 1000),
  }))
  public decreaseIndex = () => this.setState((state) => ({
    selectedIndex: R.max(0, R.dec(state.selectedIndex)),
  }))
  public toggleCumulative = () => this.setState((state) => ({
    cumulative: !state.cumulative,
  }))
  public toggleShowAll = () => this.setState((state) => ({
    showAll: !state.showAll,
  }))
}
