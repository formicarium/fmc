import { EventKind } from './../model/event';
import { Direction } from '~/modules/tracing/model/event';
import { IEventMessage, MessageType, EventType, HttpDirection, KafkaDirection } from '../model/event';
import { v4 } from 'uuid'

const createHttpInMessage = (timestamp: number, reporter: string, direction: Direction,  spanId: string, traceId: string, parentId: string, kind: EventKind): IEventMessage => {
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
      },
    },
  }
}
const createHttpOutMessage = (timestamp: number, reporter: string, direction: Direction,  spanId: string, traceId: string, parentId: string, kind: EventKind): IEventMessage => {
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
      },
    },
  }
}
const createKafkaMessage = (timestamp: number, reporter: string, direction: Direction,  spanId: string, traceId: string, parentId: string, kind: EventKind): IEventMessage => {
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

const http0 = createHttpOutMessage(0,	'X',	Direction.PRODUCER,	'O.A', 'O', 'O', EventKind.START)
const http1 = createHttpInMessage(1,	'Y',	Direction.CONSUMER,	'O.A.B', 'O', 'O.A', EventKind.START)
const http10 = createHttpInMessage(10, 'Y',	Direction.PRODUCER,	'O.A.B', 'O', 'O.A', EventKind.END)
const http11 = createHttpOutMessage(11, 'X',	Direction.CONSUMER,	'O.A', 'O', 'O',  EventKind.END)

const http2 = createHttpOutMessage(2,	'Y',	Direction.PRODUCER,	'O.A.B.C', 'O',	'O.A.B', EventKind.START)
const http4 = createHttpInMessage(4,	'Z',	Direction.CONSUMER,	'O.A.B.C.D', 'O',	'O.A.B.C', EventKind.START)
const http5 = createHttpInMessage(5,	'Z',	Direction.PRODUCER,	'O.A.B.C.D', 'O', 'O.A.B.C', EventKind.END)
const http6 = createHttpOutMessage(6,	'Y',	Direction.CONSUMER,	'O.A.B.C', 'O',	'O.A.B', EventKind.END)

const http3 = createHttpOutMessage(3,	'Y',	Direction.PRODUCER,	'O.A.B.Cx', 'O', 'O.A.B',  EventKind.START)
const http7 = createHttpInMessage(7,	'W',	Direction.CONSUMER,	'O.A.B.Cx.Dx', 'O', 'O.A.B.Cx',  EventKind.START)
const http8 = createHttpInMessage(8,	'W',	Direction.PRODUCER,	'O.A.B.Cx.Dx', 'O', 'O.A.B.Cx',  EventKind.END)
const http9 = createHttpOutMessage(9,	'Y',	Direction.CONSUMER,	'O.A.B.Cx', 'O', 'O.A.B',  EventKind.END)

// const kafka12 = createKafkaMessage(12,	'Z', Direction.PRODUCER, 'O.A.B.C.D.E',	'O',	'O.A.B.C.D', EventKind.START)
// const kafka12e = createKafkaMessage(12,	'Z', Direction.PRODUCER, 'O.A.B.C.D.E',	'O',	'O.A.B.C.D', EventKind.END)
// const kafka13 = createKafkaMessage(13,	'X', Direction.CONSUMER, 'O.A.B.C.D.E.F',	'O',	'O.A.B.C.D.E', EventKind.START)
// const kafka13e = createKafkaMessage(13,	'X', Direction.CONSUMER, 'O.A.B.C.D.E.F',	'O',	'O.A.B.C.D.E', EventKind.END)
// const kafka14 = createKafkaMessage(13,	'K', Direction.CONSUMER, 'O.A.B.C.D.E.Fx',	'O',	'O.A.B.C.D.E', EventKind.START)
// const kafka14e = createKafkaMessage(13,	'K', Direction.CONSUMER, 'O.A.B.C.D.E.Fx',	'O',	'O.A.B.C.D.E', EventKind.END)

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
  // kafka12,
  // kafka12e,
  // kafka13,
  // kafka13e,
  // kafka14,
  // kafka14e,
  // http15,
  // http15e,
]

export const MESSAGES2 = [
  createHttpOutMessage(0,	'X',	Direction.PRODUCER,	'O.A', 'O', 'O', EventKind.START),
  createHttpInMessage(1,	'Y',	Direction.CONSUMER,	'O.A.B', 'O', 'O.A', EventKind.START),
  createHttpInMessage(2,	'Y',	Direction.PRODUCER,	'O.A.B', 'O', 'O.A', EventKind.END),
  createHttpOutMessage(3,	'X',	Direction.CONSUMER,	'O.A', 'O', 'O', EventKind.END),
]
