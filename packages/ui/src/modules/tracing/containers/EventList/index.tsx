import React from 'react'
import { WithMessages } from '../../render-props/MessageList';
import { EventList } from '../../components/EventList';
import { Subscribe } from 'unstated';
import { EventListState } from '../../state/EventList';
import { IMessage } from '../../model/event';
import { FilterState } from '../../state/FilterState';

const getActiveStartIndex = ({ state }: EventListState, messages: IMessage[]) => {
  if (state.cumulative || state.showAll) {
    return 0
  }
  return state.selectedIndex
}

const getActiveEndIndex = ({ state }: EventListState, messages: IMessage[]) => {
  if (state.showAll) {
    return messages.length
  }
  return state.selectedIndex
}

export const EventListContainer = () => (
  <WithMessages>
    {({ messages }) => (
      <Subscribe to={[EventListState, FilterState]}>
      {(eventListState: EventListState, filterState: FilterState) => (
        <EventList
          events={messages}
          activeStartIndex={getActiveStartIndex(eventListState, messages)}
          activeEndIndex={getActiveEndIndex(eventListState, messages)}
          onClickRow={(message, index) => eventListState.setSelectedIndex(index)}
        />
      )}
      </Subscribe>
    )}
  </WithMessages>
)
