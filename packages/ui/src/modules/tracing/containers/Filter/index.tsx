import React from 'react'
import { FilterForm } from '../../components/FilterForm';
import { Subscribe } from 'unstated';
import { DashboardState } from '../../state/DashboardState';
import { FilterState } from '../../state/FilterState';
import { WithMessages } from '../../render-props/MessageList';
import { getUniqServicesFromEvents } from '~/modules/tracing/selectors/filter';

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
              servicesId={getUniqServicesFromEvents(messages)}
              filter={dashboardState.state.filter}
            />
          )}
          </Subscribe>
        )}
      </WithMessages>
    )
  }
}
