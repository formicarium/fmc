import React from 'react'
import { FilterForm } from '../../components/FilterForm';
import { Subscribe } from 'unstated';
import { DashboardState } from '../../state/DashboardState';
import { FilterState } from '../../state/FilterState';
import { WithMessages } from '../../render-props/MessageList';
import { IEventMessage } from '../../model/event';
import * as R from 'ramda'
const getList = (k: 'spanId' | 'parentId' | 'traceId') => (messages: IEventMessage[]): string[] => {
  return R.uniq(messages.map((message) => message.meta[k] as string))
}
const getSpanIdList = getList('spanId')
const getTraceIdList = getList('traceId')
const getParentIdList = getList('parentId')

export class FilterContainer extends React.Component {
  public render() {
    return (
      <WithMessages>
        {({ messages }) => (
          <Subscribe to={[DashboardState, FilterState]}>
          {(dashboardState: DashboardState, filterState: FilterState) => (
            <FilterForm
              setFilterEdgeTypes={dashboardState.setFilterEdgeTypes}
              setFilterNodeTypes={dashboardState.setFilterNodeTypes}
              filter={dashboardState.state.filter}
              parentId={filterState.state.parentId}
              spanId={filterState.state.spanId}
              traceId={filterState.state.traceId}
              parentIdList={getParentIdList(messages)}
              spanIdList={getSpanIdList(messages)}
              traceIdList={getTraceIdList(messages)}
              setParentId={filterState.setParentId}
              setSpanId={filterState.setSpanId}
              setTraceId={filterState.setTraceId}
            />
          )}
          </Subscribe>
        )}
      </WithMessages>
    )
  }
}
