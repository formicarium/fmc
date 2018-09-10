import { Container } from 'unstated';
import { EventType } from '~/modules/tracing/model/event';

export interface IFilterState {
  services: string[]
  eventTypes: EventType[]
  searchRegex: string
}
export class FilterState extends Container<IFilterState> {
  constructor() {
    super()
    this.state = {
      services: [],
      eventTypes: [],
      searchRegex: '',
    }
  }

  public setServices = (services: string[]) => this.setState({
    services,
  })
  public setEventTypes = (eventTypes: EventType[]) => this.setState({
    eventTypes,
  })
  public setSearchRegex = (searchRegex: string) => this.setState({
    searchRegex,
  })
}
