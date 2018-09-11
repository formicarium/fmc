import { createSelector } from 'reselect';
import { IDashboardState } from '~/modules/tracing/state/DashboardState';
import { IEventMessage } from '~/modules/tracing/model/event';
import { httpEventToRequest, httpEventToResponse } from '~/modules/tracing/logic/event-http';

export interface IStateGroup {
  dashboardState: IDashboardState
  messages: IEventMessage[]
}
const messagesSelector = (root: IStateGroup): IEventMessage[] => root.messages
const dashboardStateSelector = (root: IStateGroup): IDashboardState => root.dashboardState

const selectedEdgeSelector = createSelector(
  dashboardStateSelector,
  (dashboard) => dashboard.selectedEdge,
)

export const getHttpPanelRequestsAndResponses = createSelector(
  messagesSelector,
  selectedEdgeSelector,
  (events, selectedEdge) => {
    if (!selectedEdge) { return null }
    console.log('selectedEdge')
    console.log(selectedEdge)
    const sourceHttpEvent = events.find((event) => event.id === selectedEdge.metadata.fromEvent)
    const destHttpEvent = events.find((event) => event.id === selectedEdge.metadata.toEvent)
    console.log('sourceHttpEvent')
    console.log(sourceHttpEvent)
    console.log('destHttpEvent')
    console.log(destHttpEvent)
    const outProducer = httpEventToRequest(sourceHttpEvent, destHttpEvent.meta.service)
    const inConsumer = httpEventToRequest(destHttpEvent, sourceHttpEvent.meta.service)
    return {
      outProducer,
      inConsumer,
      inProducer: outProducer,
      outConsumer: inConsumer,
    }
  }
)
