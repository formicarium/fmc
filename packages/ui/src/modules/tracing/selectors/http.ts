import { createSelector } from 'reselect';
import { httpEventToRequest } from '~/modules/tracing/logic/event-http';
import { isRequest } from '~/modules/tracing/components/HTTP/logic';
import { eventsSelector, selectedEdgeSelector } from '~/modules/tracing/selectors/dashboard';
import { getSpanIdFromEvent, getTypeFromEvent, getDirectionFromEvent } from '~/modules/tracing/logic/event';

export const getHttpPanelRequestsAndResponses = createSelector(
  eventsSelector,
  selectedEdgeSelector,
  (events, selectedEdge) => {
    if (!selectedEdge) { return null }
    const sourceHttpEvent = events.find((event) => event.id === selectedEdge.metadata.fromEvent)
    const destHttpEvent = events.find((event) => event.id === selectedEdge.metadata.toEvent)
    const sourceHttpEventPair = events.find((event) => getSpanIdFromEvent(event) === getSpanIdFromEvent(sourceHttpEvent) && event.id !== sourceHttpEvent.id)
    const destHttpEventPair = events.find((event) => getSpanIdFromEvent(event) === getSpanIdFromEvent(destHttpEvent) && event.id !== destHttpEvent.id)

    if (isRequest(getTypeFromEvent(sourceHttpEvent), getDirectionFromEvent(sourceHttpEvent))) {
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
