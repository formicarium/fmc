import React from 'react'
import { EventList } from '../../components/EventList';
import { Subscribe } from 'unstated';
import { EventListState } from '../../state/EventList';
import { FilterState } from '../../state/FilterState';
import { ExplorerState } from '~/modules/tracing/state/ExplorerState';
import { getFilteredEvents } from '~/modules/tracing/selectors/messages';
import { WithEvents } from '~/modules/tracing/render-props/WithEvents';

// const getActiveStartIndex = ({ state }: EventListState, messages: IMessage[]) => {
//   if (state.cumulative || state.showAll) {
//     return 0
//   }
//   return state.selectedIndex
// }

// const getActiveEndIndex = ({ state }: EventListState, messages: IMessage[]) => {
//   if (state.showAll) {
//     return messages.length
//   }
//   return state.selectedIndex
// }

export const EventListContainer = () => (
  <WithEvents>
    {({ events }) => (
      <Subscribe to={[EventListState, FilterState, ExplorerState]}>
        {(eventListState: EventListState, filter: FilterState, explorer: ExplorerState) => {
          const filteredEvents = getFilteredEvents({
            events,
            filterState: filter.state,
            explorerState: explorer.state,
          })
          return (
            <EventList
              events={filteredEvents}
              activeStartIndex={0}
              activeEndIndex={filteredEvents.length}
              onClickRow={(message, index) => eventListState.setSelectedIndex(index)}
            />
          )
        }}
      </Subscribe>
    )}
  </WithEvents>
)
