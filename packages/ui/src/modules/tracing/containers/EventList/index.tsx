import React from 'react'
import { WithMessages } from '../../render-props/MessageList';
import { EventList } from '../../components/EventList';
import { Subscribe } from 'unstated';
import { EventListState } from '../../state/EventList';
import { FilterState } from '../../state/FilterState';
import { ExplorerState } from '~/modules/tracing/state/ExplorerState';
import { getFilteredMessagesReselect } from '~/modules/tracing/selectors/messages';

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
  <WithMessages>
    {({ messages }) => (
      <Subscribe to={[EventListState, FilterState, ExplorerState]}>
        {(eventListState: EventListState, filter: FilterState, explorer: ExplorerState) => {
          const filteredMessages = getFilteredMessagesReselect({
            messages,
            filterState: filter.state,
            explorerState: explorer.state,
          })
          return (
            <EventList
              events={filteredMessages}
              activeStartIndex={0}
              activeEndIndex={filteredMessages.length}
              onClickRow={(message, index) => eventListState.setSelectedIndex(index)}
            />
          )
        }}
      </Subscribe>
    )}
  </WithMessages>
)
