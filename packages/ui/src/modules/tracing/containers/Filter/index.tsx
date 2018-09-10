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
              setServices={filterState.setServices}
              setEventTypes={filterState.setEventTypes}
              servicesList={getUniqServicesFromEvents(messages)}
              services={filterState.state.services}
              eventTypes={filterState.state.eventTypes}
              loading={false}
              setSearchRegex={filterState.setSearchRegex}
              searchRegex={filterState.state.searchRegex}
              submitSearch={() => {
                console.log('submti')
              }}
            />
          )}
          </Subscribe>
        )}
      </WithMessages>
    )
  }
}
