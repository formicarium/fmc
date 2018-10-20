import { getGraphFromEvents } from '~/modules/tracing/logic/event-graph';
import memoizeOne from 'memoize-one';
import R from 'ramda'
import { createSelector } from 'reselect'
import { IExplorerState } from '~/modules/tracing/state/ExplorerState';
import { IFilterState } from '~/modules/tracing/state/FilterState';
import { IEvent } from '~/modules/tracing/graphql/queries/events';

export interface IStateGroup {
  explorerState: IExplorerState
  filterState: IFilterState
  events: IEvent[]
}
const explorerStateSelector = (root: IStateGroup): IExplorerState => root.explorerState
const filterStateSelector = (root: IStateGroup): IFilterState => root.filterState
const eventsSelector = (root: IStateGroup): IEvent[] => root.events

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

export const getFilteredEvents = createSelector(
  eventsSelector,
  spanFilterSelector,
  servicesFilterSelector,
  eventTypesFilterSelector,
  (events, spanFilter, services, eventTypes) => {
    return R.filter(R.allPass([
      (event: IEvent) => event.payload && new RegExp(`${spanFilter}(\\.(.*))?$`).test(event.payload.context.spanId),
      (event: IEvent) => event.meta && R.or(R.isEmpty(services), R.contains(event.meta.service, services)),
      (event: IEvent) => event.payload && R.or(R.isEmpty(eventTypes), R.contains(event.payload.tags.type, eventTypes)),
    ]), events) as IEvent[]
  },
)

const getTimestamp = (message: IEvent) => message.meta.timestamp
export const getSortedEvents = memoizeOne((events: IEvent[]) => R.sortBy(getTimestamp, events))

export const graphFromEventsReselect = createSelector(
  getFilteredEvents,
  (events) => getGraphFromEvents(events),
)
