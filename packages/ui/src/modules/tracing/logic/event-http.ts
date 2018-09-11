import { IEventMessage, IHttpPayload } from '~/modules/tracing/model/event';
import { IRequestProps } from '~/modules/tracing/components/HTTP/Request';
import { IResponseProps } from '~/modules/tracing/components/HTTP/Response';
// verb: HTTPVerb
//   service: string,
//   targetService: string
//   endpoint: string
//   headers: object,
//   body: object
//   timestamp: number

export const httpEventToRequest = (event: IEventMessage, peerService: string): IRequestProps => {
  const payload = event.payload as IHttpPayload

  return {
    spanId: event.meta.spanId,
    direction: payload.direction,
    status: payload.data.request.status,
    eventType: payload.type,
    service: event.meta.service,
    verb: payload.data.request.verb,
    peerService,
    endpoint: payload.data.endpoint.uri,
    headers: payload.data.request.headers,
    body: payload.data.request.body,
    timestamp: event.meta.timestamp,
  }
}

/*

export interface IResponseProps {
  status: number
  service: string,
  headers: object
  body: object
}
*/
export const httpEventToResponse = (event: IEventMessage): IResponseProps => {
  const payload = event.payload as IHttpPayload

  return {
    eventType: event.payload.type,
    service: event.meta.service,
    headers: payload.data.request.headers,
    body: payload.data.request.body,
    status: payload.data.request.status,
  }
}
