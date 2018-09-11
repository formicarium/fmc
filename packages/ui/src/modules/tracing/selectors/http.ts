import { createSelector } from 'reselect';
import { IDashboardState } from '~/modules/tracing/state/DashboardState';
import { IEventMessage } from '~/modules/tracing/model/event';
import { httpEventToRequest, httpEventToResponse } from '~/modules/tracing/logic/event-http';
import { isRequest } from '~/modules/tracing/components/HTTP/logic';

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
    const sourceHttpEvent = events.find((event) => event.id === selectedEdge.metadata.fromEvent)
    const destHttpEvent = events.find((event) => event.id === selectedEdge.metadata.toEvent)
    const sourceHttpEventPair = events.find((event) => event.meta.spanId === sourceHttpEvent.meta.spanId && event.id !== sourceHttpEvent.id)
    const destHttpEventPair = events.find((event) => event.meta.spanId === destHttpEvent.meta.spanId && event.id !== destHttpEvent.id)

    if (isRequest(sourceHttpEvent.payload.type, sourceHttpEvent.payload.direction)) {
      const outProducer = httpEventToRequest(sourceHttpEvent, destHttpEvent.meta.service)
      const inConsumer = httpEventToRequest(destHttpEvent, sourceHttpEvent.meta.service)
      const outConsumer = httpEventToRequest(sourceHttpEventPair, destHttpEventPair.meta.service)
      const inProducer = httpEventToRequest(destHttpEventPair, sourceHttpEventPair.meta.service)
      return {
        outProducer,
        inConsumer,
        inProducer,
        outConsumer,
      }
    } else {
      const outProducer = httpEventToRequest(destHttpEventPair, sourceHttpEventPair.meta.service)
      const inConsumer = httpEventToRequest(sourceHttpEventPair, destHttpEventPair.meta.service)
      const outConsumer = httpEventToRequest(destHttpEvent, sourceHttpEvent.meta.service)
      const inProducer = httpEventToRequest(sourceHttpEvent, destHttpEvent.meta.service)
      return {
        outProducer,
        inConsumer,
        inProducer,
        outConsumer,
      }
    }

  }
)
