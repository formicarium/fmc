import { Direction } from '~/modules/tracing/model/event';
import { IEventMessage, MessageType, EventType, HttpDirection, KafkaDirection } from '../model/event';

const createHttpMessage = (timestamp: number, reporter: string, direction: Direction,  spanId: string, traceId: string, parentId?: string): IEventMessage => {
  return {
    id: `ev_${timestamp}`,
    identity: reporter,
    meta: {
      type: MessageType.EVENT,
      timestamp,
      service: reporter,
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
          service: 'xxx',
        },
      },
    },
  }
}
const createKafkaMessage = (timestamp: number, reporter: string, direction: Direction,  spanId: string, traceId: string, parentId?: string): IEventMessage => {
  return {
    id: `ev_${timestamp}`,
    identity: reporter,
    meta: {
      type: MessageType.EVENT,
      timestamp,
      service: reporter,
      traceId,
      spanId,
      parentId,
    },
    payload: {
      type: EventType.KAFKA,
      direction,
      data: {
        endpoint: {
          topic: 'xablau',
        },
      },
    },
  }
}

const http0 = createHttpMessage(0,	'X',	Direction.PRODUCER,	'O.A'	, 'O', 'O')
const http1 = createHttpMessage(1,	'Y',	Direction.CONSUMER,	'O.A.B', 'O', 'O.A')
const http2 = createHttpMessage(2,	'Y',	Direction.PRODUCER,	'O.A.B.C', 'O',	'O.A.B')
const http3 = createHttpMessage(3,	'Y',	Direction.PRODUCER,	'O.A.B.Cx', 'O', 'O.A.B')
const http4 = createHttpMessage(4,	'Z',	Direction.CONSUMER,	'O.A.B.C.D', 'O',	'O.A.B.C')
const http5 = createHttpMessage(5,	'Z',	Direction.PRODUCER,	'O.A.B.C.D'	, 'O', 'O.A.B.C')
const http6 = createHttpMessage(6,	'Y',	Direction.CONSUMER,	'O.A.B.C'	, 'O',	'O.A.B')
const http7 = createHttpMessage(7,	'W',	Direction.CONSUMER,	'O.A.B.Cx.Dx'	, 'O',	'O.A.B.Cx')
const http8 = createHttpMessage(8,	'W',	Direction.PRODUCER,	'O.A.B.Cx.Dx'	, 'O',	'O.A.B.Cx')
const http9 = createHttpMessage(9,	'Y',	Direction.CONSUMER,	'O.A.B.Cx'	, 'O',	'O.A.B')
const http10 = createHttpMessage(10, 'Y',	Direction.PRODUCER,	'O.A.B',	'O',	'O.A')
const http11 = createHttpMessage(11, 'X',	Direction.CONSUMER,	'O.A',	'O',	'O')
const kafka12 = createKafkaMessage(12,	'Z', Direction.PRODUCER, 'O.A.B.C.D.E',	'O',	'O.A.B.C.D')
const kafka13 = createKafkaMessage(13,	'X', Direction.CONSUMER, 'O.A.B.C.D.E.F',	'O',	'O.A.B.C.D.E')
const kafka14 = createKafkaMessage(14,	'K', Direction.CONSUMER, 'O.A.B.C.D.E.Fx',	'O',	'O.A.B.C.D.E')

export const MESSAGES = [
  http0,
  http1,
  http2,
  http3,
  http4,
  http5,
  http6,
  http7,
  http8,
  http9,
  http10,
  http11,
  kafka12,
  kafka13,
  kafka14,
]
