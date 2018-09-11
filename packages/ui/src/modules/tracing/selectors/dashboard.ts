import { createSelector } from 'reselect';
import { IDashboardState } from '~/modules/tracing/state/DashboardState';
import { IEventMessage } from '~/modules/tracing/model/event';

export interface IStateGroup {
  dashboardState: IDashboardState
  messages: IEventMessage[]
}
export const messagesSelector = (root: IStateGroup): IEventMessage[] => root.messages
export const dashboardStateSelector = (root: IStateGroup): IDashboardState => root.dashboardState

export const selectedEdgeSelector = createSelector(
  dashboardStateSelector,
  (dashboard) => dashboard.selectedEdge,
)
