import { createSelector } from 'reselect';
import { IDashboardState } from '~/modules/tracing/state/DashboardState';
import { IEvent } from '~/modules/tracing/graphql/queries/events';

export interface IStateGroup {
  dashboardState: IDashboardState
  messages: IEvent[]
}
export const messagesSelector = (root: IStateGroup): IEvent[] => root.messages
export const dashboardStateSelector = (root: IStateGroup): IDashboardState => root.dashboardState

export const selectedEdgeSelector = createSelector(
  dashboardStateSelector,
  (dashboard) => dashboard.selectedEdge,
)
