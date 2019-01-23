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
    const sourceHttpEventPair = sourceHttpEvent && events.find((event) => getSpanIdFromEvent(event) === getSpanIdFromEvent(sourceHttpEvent) && event.id !== sourceHttpEvent.id)
    const destHttpEventPair = destHttpEvent && events.find((event) => getSpanIdFromEvent(event) === getSpanIdFromEvent(destHttpEvent) && event.id !== destHttpEvent.id)

    if (isRequest(getTypeFromEvent(sourceHttpEvent), getDirectionFromEvent(sourceHttpEvent))) {
      const outProducer = destHttpEvent && httpEventToRequest(sourceHttpEvent, destHttpEvent.meta.service)
      const inConsumer = sourceHttpEvent && httpEventToRequest(destHttpEvent, sourceHttpEvent.meta.service)
      const outConsumer = destHttpEventPair && httpEventToRequest(sourceHttpEventPair, destHttpEventPair.meta.service)
      const inProducer = sourceHttpEventPair && httpEventToRequest(destHttpEventPair, sourceHttpEventPair.meta.service)
      return {
        outProducer,
        inConsumer,
        inProducer,
        outConsumer,
      }
    } else {
      const outProducer = sourceHttpEventPair && httpEventToRequest(destHttpEventPair, sourceHttpEventPair.meta.service)
      const inConsumer = destHttpEventPair && httpEventToRequest(sourceHttpEventPair, destHttpEventPair.meta.service)
      const outConsumer = sourceHttpEventPair && httpEventToRequest(destHttpEvent, sourceHttpEvent.meta.service)
      const inProducer = destHttpEventPair && httpEventToRequest(sourceHttpEvent, destHttpEvent.meta.service)
      return {
        outProducer,
        inConsumer,
        inProducer,
        outConsumer,
      }
    }

  }
)
