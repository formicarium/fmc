import { IKafkaEventProps } from '~/modules/tracing/components/Kafka/KafkaEvent';
import { Direction } from '~/modules/tracing/model/event';

export const kafkaProducer: IKafkaEventProps = {
  spanId: 'O.A',
  direction: Direction.PRODUCER,
  service: 'asheara',
  peerService: 'blackleach',
  topic: ':NEW-CUSTOMER',
  data: {
    name: 'Rafael',
    age: 25,
    friends: [{
      name: 'Lucas',
    }],
  },
  timestamp: new Date().getTime(),
}

export const kafkaConsumer: IKafkaEventProps = {
  spanId: 'O.A.B',
  direction: Direction.CONSUMER,
  service: 'blackleach',
  peerService: 'asheara',
  topic: ':NEW-CUSTOMER',
  data: {
    name: 'Rafael',
    age: 25,
    friends: [{
      name: 'Lucas',
    }],
  },
  timestamp: new Date().getTime(),
}
