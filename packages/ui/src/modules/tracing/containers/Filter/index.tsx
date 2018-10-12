import React from 'react'
import { FilterForm } from '../../components/FilterForm';
import { Subscribe } from 'unstated';
import { FilterState } from '../../state/FilterState';
import { getUniqServicesFromEvents } from '~/modules/tracing/selectors/filter';
import { WithEvents } from '~/modules/tracing/render-props/WithEvents';

export class FilterContainer extends React.Component {
  public render() {
    return (
      <WithEvents>
        {({ events }) => (
          <Subscribe to={[FilterState]}>
          {(filterState: FilterState) => (
            <FilterForm
              setServices={filterState.setServices}
              setEventTypes={filterState.setEventTypes}
              servicesList={getUniqServicesFromEvents(events)}
              services={filterState.state.services}
              eventTypes={filterState.state.eventTypes}
              loading={false}
              setSearchRegex={filterState.setSearchRegex}
              searchRegex={filterState.state.searchRegex}
              submitSearch={() => {
                console.log('TODO')
              }}
            />
          )}
          </Subscribe>
        )}
      </WithEvents>
    )
  }
}
