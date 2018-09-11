import { IEventMessage, IKafkaPayload } from '~/modules/tracing/model/event';
import { IKafkaEventProps } from '~/modules/tracing/components/Kafka/KafkaEvent';

export const kafkaEventToProps = (event: IEventMessage, peerService: string): IKafkaEventProps => {
  const payload = event.payload as IKafkaPayload

  return {
    spanId: event.meta.spanId,
    direction: payload.direction,
    service: event.meta.service,
    peerService,
    topic: payload.data.endpoint.topic,
    data: payload.data.message.data,
    timestamp: event.meta.timestamp,
  }
}
