import { Nullable } from '@formicarium/common';
import { HTTPVerb } from '~/modules/tracing/components/HTTP/HTTPVerb';

// MESSAGE
export enum MessageType {
  HEARTHBEAT = 'HEARTHBEAT',
  EVENT = 'EVENT',
}

export enum EventKind {
  START = 'START',
  END = 'END',
}
// MESSAGE-META
export interface IBaseMessageMeta {
  timestamp: number
  service: string
  traceId: string
  spanId: string
  parentId?: string
}

export interface IEventMessageMeta extends IBaseMessageMeta {
  type: MessageType.EVENT,
  kind: Nullable<EventKind>
}

export interface IHeartbeatMessageMeta extends IBaseMessageMeta {
  type: MessageType.HEARTHBEAT,
}

// HEARTBEAT
export interface IHeartbeatPayload {
  ping: string
}

// EVENT
export enum EventType {
  KAFKA = 'KAFKA',
  HTTP = 'HTTP_IN',
  HTTP_OUT = 'HTTP_OUT',
}

export enum Direction {
  PRODUCER = 'PRODUCER',
  CONSUMER = 'CONSUMER',
}

export interface IHttpPayload {
  type: EventType.HTTP | EventType.HTTP_OUT
  direction: Direction
  data: {
    endpoint: {
      uri: string
      service: string,
    },
    request?: {
      headers?: object,
      body?: object,
      verb?: HTTPVerb,
      status?: number,
    }
  }
}

export interface IKafkaPayload {
  type: EventType.KAFKA
  direction: Direction
  data: {
    endpoint: {
      topic: string,
    },
    message: {
      data: object,
    }
  }
}
export type IEventPayload = IHttpPayload | IKafkaPayload

// MESSAGE
export interface IBaseMessage {
  id: string
  identity: string
}
export interface IEventMessage extends IBaseMessage {
  meta: IEventMessageMeta
  payload: IEventPayload
}

export interface IHeartbeatMessage extends IBaseMessage {
  meta: IHeartbeatMessageMeta
  payload: IHeartbeatPayload
}

export type IMessage = IEventMessage | IHeartbeatMessage
