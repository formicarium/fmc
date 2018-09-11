import { EventKind } from './../model/event';
import { Direction } from '~/modules/tracing/model/event';
import { IEventMessage, MessageType, EventType } from '../model/event';
import { v4 } from 'uuid'
import { HTTPVerb } from '~/modules/tracing/components/HTTP/HTTPVerb';

export const createHttpInMessage = (timestamp: number, reporter: string, direction: Direction,  spanId: string, traceId: string, parentId: string, kind: EventKind): IEventMessage => {
  return {
    id: `ev_${timestamp}_${v4()}`,
    identity: reporter,
    meta: {
      type: MessageType.EVENT,
      timestamp,
      service: reporter,
      traceId,
      spanId,
      parentId,
      kind,
    },
    payload: {
      type: EventType.HTTP,
      direction,
      data: {
        endpoint: {
          uri: '/blabla',
          service: 'xxx',
        },
        request: {
          body: {
            body1: 'body1'
          },
          headers: {
            headers: 'header1'
          },
          verb: HTTPVerb.POST,
          status: 200
        }
      },
    },
  }
}
export const createHttpOutMessage = (timestamp: number, reporter: string, direction: Direction,  spanId: string, traceId: string, parentId: string, kind: EventKind): IEventMessage => {
  return {
    id: `ev_${timestamp}_${v4()}`,
    identity: reporter,
    meta: {
      type: MessageType.EVENT,
      timestamp,
      service: reporter,
      traceId,
      spanId,
      parentId,
      kind,
    },
    payload: {
      type: EventType.HTTP_OUT,
      direction,
      data: {
        endpoint: {
          uri: '/blabla',
          service: 'xxx',
        },
        request: {
          body: {
            body1: 'body1'
          },
          headers: {
            headers: 'header1'
          },
          verb: HTTPVerb.POST,
          status: 200
        }
      },
    },
  }
}
export const createKafkaMessage = (timestamp: number, reporter: string, direction: Direction,  spanId: string, traceId: string, parentId: string, kind: EventKind): IEventMessage => {
  return {
    id: `ev_${timestamp}_${v4()}`,
    identity: reporter,
    meta: {
      type: MessageType.EVENT,
      timestamp,
      service: reporter,
      traceId,
      spanId,
      parentId,
      kind,
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

export const nowPlusSeconds = (seconds: number): number => {
  const t = new Date()
  t.setSeconds(t.getSeconds() + seconds)
  return t.getTime()
}

const http0 = createHttpOutMessage(nowPlusSeconds(0),	'stormshield',	Direction.PRODUCER,	'O.A', 'O', 'O', EventKind.START)
const http1 = createHttpInMessage(nowPlusSeconds(1),	'warriv',	Direction.CONSUMER,	'O.A.B', 'O', 'O.A', EventKind.START)
const http10 = createHttpInMessage(nowPlusSeconds(10), 'warriv',	Direction.PRODUCER,	'O.A.B', 'O', 'O.A', EventKind.END)
const http11 = createHttpOutMessage(nowPlusSeconds(11), 'stormshield',	Direction.CONSUMER,	'O.A', 'O', 'O',  EventKind.END)

const http2 = createHttpOutMessage(nowPlusSeconds(2),	'warriv',	Direction.PRODUCER,	'O.A.B.C', 'O',	'O.A.B', EventKind.START)
const http4 = createHttpInMessage(nowPlusSeconds(4),	'waypoint',	Direction.CONSUMER,	'O.A.B.C.D', 'O',	'O.A.B.C', EventKind.START)
const http5 = createHttpInMessage(nowPlusSeconds(5),	'waypoint',	Direction.PRODUCER,	'O.A.B.C.D', 'O', 'O.A.B.C', EventKind.END)
const http6 = createHttpOutMessage(nowPlusSeconds(6),	'warriv',	Direction.CONSUMER,	'O.A.B.C', 'O',	'O.A.B', EventKind.END)

const http3 = createHttpOutMessage(nowPlusSeconds(3),	'warriv',	Direction.PRODUCER,	'O.A.B.Cx', 'O', 'O.A.B',  EventKind.START)
const http7 = createHttpInMessage(nowPlusSeconds(7),	'asheara',	Direction.CONSUMER,	'O.A.B.Cx.Dx', 'O', 'O.A.B.Cx',  EventKind.START)
const http8 = createHttpInMessage(nowPlusSeconds(8),	'asheara',	Direction.PRODUCER,	'O.A.B.Cx.Dx', 'O', 'O.A.B.Cx',  EventKind.END)
const http9 = createHttpOutMessage(nowPlusSeconds(9),	'warriv',	Direction.CONSUMER,	'O.A.B.Cx', 'O', 'O.A.B',  EventKind.END)

const kafka12 = createKafkaMessage(nowPlusSeconds(12),	'waypoint', Direction.PRODUCER, 'O.A.B.C.D.E',	'O',	'O.A.B.C.D', EventKind.START)
const kafka12e = createKafkaMessage(nowPlusSeconds(13),	'waypoint', Direction.PRODUCER, 'O.A.B.C.D.E',	'O',	'O.A.B.C.D', EventKind.END)
const kafka13 = createKafkaMessage(nowPlusSeconds(13),	'stormshield', Direction.CONSUMER, 'O.A.B.C.D.E.F',	'O',	'O.A.B.C.D.E', EventKind.START)
const kafka13e = createKafkaMessage(nowPlusSeconds(13),	'stormshield', Direction.CONSUMER, 'O.A.B.C.D.E.F',	'O',	'O.A.B.C.D.E', EventKind.END)
const kafka14 = createKafkaMessage(nowPlusSeconds(13),	'blackleach', Direction.CONSUMER, 'O.A.B.C.D.E.Fx',	'O',	'O.A.B.C.D.E', EventKind.START)
const kafka14e = createKafkaMessage(nowPlusSeconds(13),	'blackleach', Direction.CONSUMER, 'O.A.B.C.D.E.Fx',	'O',	'O.A.B.C.D.E', EventKind.END)

// const http15 = createHttpMessage(14,	'Y',	Direction.CONSUMER,	'O.A.Bx', 'O', 'O.A', EventKind.START)
// const http15e = createHttpMessage(15,	'Y',	Direction.CONSUMER,	'O.A.Bx', 'O', 'O.A', EventKind.END)

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
  kafka12e,
  kafka13,
  kafka13e,
  kafka14,
  kafka14e,
  // http15,
  // http15e,
]

export const MESSAGES2 = [
  createHttpOutMessage(0,	'X',	Direction.PRODUCER,	'O.A', 'O', 'O', EventKind.START),
  createHttpInMessage(1,	'Y',	Direction.CONSUMER,	'O.A.B', 'O', 'O.A', EventKind.START),
  createHttpInMessage(2,	'Y',	Direction.PRODUCER,	'O.A.B', 'O', 'O.A', EventKind.END),
  createHttpOutMessage(3,	'X',	Direction.CONSUMER,	'O.A', 'O', 'O', EventKind.END),
]
