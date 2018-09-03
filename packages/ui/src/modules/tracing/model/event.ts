// MESSAGE
export enum MessageType {
  HEARTHBEAT = 'HEARTHBEAT',
  EVENT = 'EVENT',
}

// MESSAGE-META
export interface IBaseMessageMeta {
  timestamp: Date,
  service: string
  traceId: string
  spanId: string
  parentId?: string
}

export interface IEventMessageMeta extends IBaseMessageMeta {
  type: MessageType.EVENT,
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
  HTTP = 'HTTP',
}

// HTTP
export enum HttpDirection {
  OUT_REQUEST = 'OUT_REQUEST',
  IN_REQUEST = 'IN_REQUEST',
}

export interface IHttpPayload {
  type: EventType.HTTP
  direction: HttpDirection
  data: {
    endpoint: {
      uri: string
      service: string,
    },
  }
}

// KAFKA
export enum KafkaDirection {
  CONSUMER = 'CONSUMER',
  PRODUCER = 'PRODUCER',
}

export interface IKafkaPayload {
  type: EventType.KAFKA
  direction: KafkaDirection
  data: {
    endpoint: {
      topic: string,
    },
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
