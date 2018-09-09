import { Nullable } from '@formicarium/common/src/utils/types';
import { Container } from 'unstated';

export interface IFilterState {
  traceId: Nullable<string>;
  spanId: Nullable<string>;
  parentId: Nullable<string>;
}
export class FilterState extends Container<IFilterState> {
  constructor() {
    super()
    this.state = {
      traceId: null,
      spanId: null,
      parentId: null,
    }
  }

  public setTraceId = (traceId: string) => this.setState({
    traceId,
  })
  public setSpanId = (spanId: string) => this.setState({
    spanId,
  })
  public setParentId = (parentId: string) => this.setState({
    parentId,
  })
}
