import gql from 'graphql-tag';
import { Nullable } from '@formicarium/common';

export enum EventType {
  newEvent = 'newEvent',
  heartbeat = 'heartbeat',
  test = 'test',
}

export enum SpanDirection {
  consumer = 'consumer',
  producer = 'producer',
}

export enum SpanType {
  httpIn = 'httpIn',
  httpOut = 'httpOut',
  kafka = 'kafka',
}

export enum SpanKind {
  start = 'start',
  end = 'end',
}

export enum ServiceStatus {
  healthy = 'healthy',
  unresponsive = 'unresponsive',
  dead = 'dead',
}

export interface IEventMeta {
  type: string
  service: string
  timestamp: Nullable<string>
}

export interface IPayloadContext {
  parentId: string
  spanId: string
  traceId: string
}

export interface IHttpTags {
  method: string
  statusCode: number
  url: string
}

export interface IKafkaTags {
  topic: string
}

export interface IPeer {
  port: number
  service: string
}

export interface ITags {
  type: string
  direction: string
  kind: string
  http?: Nullable<IHttpTags>
  kafka?: Nullable<IKafkaTags>
  peer: IPeer
}
export interface IEventPayload {
  context: IPayloadContext
  data: string
  timestamp: Nullable<string>
  tags: ITags
}
export interface IEvent {
  identity: string
  meta: IEventMeta
  payload: IEventPayload
}
export interface IEventsQueryResponse {
  events: IEvent[]
}

export const EVENTS_QUERY = gql`
  query eventsQuery {
    events {
      identity
      meta {
        type
        service
        timestamp
      }
      payload {
        context {
          parentId
          spanId
          traceId
        }
        data
        timestamp
        tags {
          type
          direction
          kind
          http {
            method
            statusCode
            url
          }
          peer {
            port
            service
          }
        }
      }
    }
  }
`
