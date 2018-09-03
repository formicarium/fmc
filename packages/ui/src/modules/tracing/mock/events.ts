import { IEventMessage, MessageType, EventType, HttpDirection, KafkaDirection } from '../model/event';
import * as R from 'ramda'
const exampleKafkaMessage: IEventMessage = {
  id: '1',
  identity: 'service-1',
  meta: {
    type: MessageType.EVENT,
    timestamp: new Date(),
    service: 'service-1',
    traceId: 'A',
    spanId: 'B',
  },
  payload: {
    type: EventType.KAFKA,
    direction: KafkaDirection.CONSUMER,
    data: {
      endpoint: {
        topic: 'topic-1',
      },
    },
  },
}
const exampleHttpMessage: IEventMessage = {
  id: '2',
  identity: 'service-1',
  meta: {
    type: MessageType.EVENT,
    timestamp: new Date(),
    service: 'service-1',
    traceId: 'A',
    spanId: 'C',
    parentId: 'B',
  },
  payload: {
    type: EventType.HTTP,
    direction: HttpDirection.IN_REQUEST,
    data: {
      endpoint: {
        uri: '/blabla',
        service: 'service-2',
      },
    },
  },
}

const exampleHttpOutMessage: IEventMessage = {
  id: '3',
  identity: 'service-1',
  meta: {
    type: MessageType.EVENT,
    timestamp: new Date(),
    service: 'service-1',
    traceId: 'A',
    spanId: 'D',
    parentId: 'C',
  },
  payload: {
    type: EventType.HTTP,
    direction: HttpDirection.OUT_REQUEST,
    data: {
      endpoint: {
        uri: '/blabla',
        service: 'service-2',
      },
    },
  },
}

const exampleKafkaProduceMessage: IEventMessage = {
  id: '4',
  identity: 'service-1',
  meta: {
    type: MessageType.EVENT,
    timestamp: new Date(),
    service: 'service-1',
    traceId: 'A',
    spanId: 'E',
    parentId: 'D',
  },
  payload: {
    type: EventType.KAFKA,
    direction: KafkaDirection.PRODUCER,
    data: {
      endpoint: {
        topic: 'topic-2',
      },
    },
  },
}

const buildService = (i) => ({
  name: `service-${i}`,
})

const buildTopic = (i) => ({
  name: `topic-${i}`,
})

const servicePool = R.range(0, 10).map(buildService)
const topicPool = R.range(0, 10).map(buildTopic)

const randomArrayItem = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];

const randomService = () => randomArrayItem(servicePool)
const randomTopic = () => randomArrayItem(topicPool)

const kafkaDirections = [KafkaDirection.CONSUMER, KafkaDirection.PRODUCER]
const randomKafkaDirection = () => randomArrayItem(kafkaDirections)

const httpDirections = [HttpDirection.IN_REQUEST, HttpDirection.OUT_REQUEST]
const randomHttpDirection = () => randomArrayItem(httpDirections)

const randomKafkaMessage = (svc: string, topic: string, direction: KafkaDirection, traceId: string, spanId: string, parentId?: string): IEventMessage => {
  return {
    id: `${Math.random()}`,
    identity: svc,
    meta: {
      type: MessageType.EVENT,
      timestamp: new Date(),
      service: svc,
      traceId,
      spanId,
      parentId,
    },
    payload: {
      type: EventType.KAFKA,
      direction,
      data: {
        endpoint: {
          topic,
        },
      },
    },
  }
}

const randomHttpMessage = (svc1: string, svc2: string, direction: HttpDirection, traceId: string, spanId: string, parentId?: string): IEventMessage => {
  return {
    id: `${Math.random()}`,
    identity: svc1,
    meta: {
      type: MessageType.EVENT,
      timestamp: new Date(),
      service: svc1,
      traceId,
      spanId,
      parentId,
    },
    payload: {
      type: EventType.HTTP,
      direction,
      data: {
        endpoint: {
          uri: '/blabla',
          service: svc2,
        },
      },
    },
  }
}

// export const MESSAGES = R.range(0, 100).map((i) => i % 2 === 0 ? randomKafkaMessage() : randomHttpMessage())

export const MESSAGES = [
  randomHttpMessage('svc1', 'svc2', HttpDirection.OUT_REQUEST, 'X', 'X.B'),
  randomHttpMessage('svc1', 'svc2', HttpDirection.IN_REQUEST, 'X', 'X.B.C', 'X.B'),
  randomKafkaMessage('svc2', 'topic1', KafkaDirection.PRODUCER, 'X', 'X.B.D', 'X.B'),
  randomKafkaMessage('svc3', 'topic1', KafkaDirection.CONSUMER, 'X', 'X.B.E', 'X.B'),

  randomHttpMessage('svc1', 'svc2', HttpDirection.OUT_REQUEST, 'Y', 'Y.B'),
  randomHttpMessage('svc1', 'svc2', HttpDirection.IN_REQUEST, 'Y', 'Y.B.C', 'Y.B'),
  randomKafkaMessage('svc2', 'topic1', KafkaDirection.PRODUCER, 'Y', 'Y.B.D', 'Y.B'),
  randomKafkaMessage('svc3', 'topic1', KafkaDirection.CONSUMER, 'Y', 'Y.B.E', 'Y.B'),
]
