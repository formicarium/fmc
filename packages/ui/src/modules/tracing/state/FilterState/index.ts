import { Container } from 'unstated';
import { SpanType } from '~/modules/tracing/graphql/queries/events';

export interface IFilterState {
  services: string[]
  eventTypes: SpanType[]
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
  public setEventTypes = (eventTypes: SpanType[]) => this.setState({
    eventTypes,
  })
  public setSearchRegex = (searchRegex: string) => this.setState({
    searchRegex,
  })
}
