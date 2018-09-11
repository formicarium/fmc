import { getGraphFromEvents } from '~/modules/tracing/logic/event-graph';
import { IEventMessage } from '~/modules/tracing/model/event';
import memoizeOne from 'memoize-one';
import R from 'ramda'
import { createSelector } from 'reselect'
import { IExplorerState } from '~/modules/tracing/state/ExplorerState';
import { IFilterState } from '~/modules/tracing/state/FilterState';

export interface IStateGroup {
  explorerState: IExplorerState
  filterState: IFilterState
  messages: IEventMessage[]
}
const explorerStateSelector = (root: IStateGroup): IExplorerState => root.explorerState
const filterStateSelector = (root: IStateGroup): IFilterState => root.filterState
const messagesSelector = (root: IStateGroup): IEventMessage[] => root.messages

const spanFilterSelector = createSelector(
  explorerStateSelector,
  (explorerState) => explorerState.spanFilter,
)
const servicesFilterSelector = createSelector(
  filterStateSelector,
  (filterState) => filterState.services,
)
const eventTypesFilterSelector = createSelector(
  filterStateSelector,
  (filterState) => filterState.eventTypes,
)

export const getFilteredMessagesReselect = createSelector(
  messagesSelector,
  spanFilterSelector,
  servicesFilterSelector,
  eventTypesFilterSelector,
  (messages, spanFilter, services, eventTypes) => {
    return R.filter(R.allPass([
      (message: IEventMessage) => new RegExp(`${spanFilter}(\\.(.*))?$`).test(message.meta.spanId),
      (message: IEventMessage) => R.or(R.isEmpty(services), R.contains(message.meta.service, services)),
      (message: IEventMessage) => R.or(R.isEmpty(eventTypes), R.contains(message.payload.type, eventTypes)),
    ]), messages)
  },
)

const getTimestamp = (message: IEventMessage) => message.meta.timestamp
export const getSortedMessages = memoizeOne((messages: IEventMessage[]) => R.sortBy(getTimestamp, messages))

export const graphFromEventsReselect = createSelector(
  getFilteredMessagesReselect,
  (events) => getGraphFromEvents(events),
)
