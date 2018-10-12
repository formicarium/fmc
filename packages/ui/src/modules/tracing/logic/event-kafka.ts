import { IKafkaEventProps } from '~/modules/tracing/components/Kafka/KafkaEvent';
import { IEvent } from '~/modules/tracing/graphql/queries/events';
import { getSpanIdFromEvent, getDirectionFromEvent, getTypeFromEvent, getReporterId, getTimestampFromEvent } from '~/modules/tracing/logic/event';

export const kafkaEventToProps = (event: IEvent, peerService: string): IKafkaEventProps => {
  const topic = 'TODO' // TODO
  const data = {}

  return {
    spanId: getSpanIdFromEvent(event),
    direction: getDirectionFromEvent(event),
    service: getReporterId(event),
    peerService,
    topic,
    data,
    timestamp: getTimestampFromEvent(event),
  }
}
