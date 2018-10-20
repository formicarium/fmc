import { IRequestProps } from '~/modules/tracing/components/HTTP/Request';
import { IEvent } from '~/modules/tracing/graphql/queries/events';
import { getSpanIdFromEvent, getDirectionFromEvent, getTypeFromEvent, getReporterId, getTimestampFromEvent } from '~/modules/tracing/logic/event';
import { HTTPVerb } from '~/modules/tracing/components/HTTP/HTTPVerb';
import edn from 'jsedn';

export const httpEventToRequest = (event: IEvent, peerService: string): IRequestProps => {
  const {
    statusCode,
    method,
    url,
  } = event.payload.tags.http

  const parsed = edn.toJS(edn.parse(event.payload.payload))
  const body = parsed[":payload"]
  const headers = parsed[":headers"]
  return {
    spanId: getSpanIdFromEvent(event),
    direction: getDirectionFromEvent(event),
    status: statusCode,
    eventType: getTypeFromEvent(event),
    service: getReporterId(event),
    verb: method as HTTPVerb,
    peerService,
    endpoint: url,
    headers,
    body,
    timestamp: getTimestampFromEvent(event),
  }
}
