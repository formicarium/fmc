import { createSelector } from 'reselect';
import { IDashboardState } from '~/modules/tracing/state/DashboardState';
import { IEvent } from '~/modules/tracing/graphql/queries/events';

export interface IStateGroup {
  dashboardState: IDashboardState
  events: IEvent[]
}
export const messagesSelector = (root: IStateGroup): IEvent[] => root.events
export const eventsSelector = messagesSelector
export const dashboardStateSelector = (root: IStateGroup): IDashboardState => root.dashboardState

export const selectedEdgeSelector = createSelector(
  dashboardStateSelector,
  (dashboard) => dashboard.selectedEdge,
)
