import { createSelector } from 'reselect';
import { messagesSelector, selectedEdgeSelector } from '~/modules/tracing/selectors/dashboard';
import { kafkaEventToProps } from '~/modules/tracing/logic/event-kafka';

export const getKafkaGrid = createSelector(
  messagesSelector,
  selectedEdgeSelector,
  (events, selectedEdge) => {
    if (!selectedEdge) { return null }
    const sourceKafkaEvent = events.find((event) => event.id === selectedEdge.metadata.fromEvent)
    const destKafkaEvent = events.find((event) => event.id === selectedEdge.metadata.toEvent)
    const producer = kafkaEventToProps(sourceKafkaEvent, destKafkaEvent.meta.service)
    const consumer = kafkaEventToProps(destKafkaEvent, sourceKafkaEvent.meta.service)
    return {
      producer,
      consumer,
    }
  }
)
