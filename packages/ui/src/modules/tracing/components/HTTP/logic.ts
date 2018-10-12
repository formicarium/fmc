import { SpanType, SpanDirection } from '~/modules/tracing/graphql/queries/events';

export enum HTTPVerb {
  POST = 'POST',
  GET = 'GET',
  HEAD = 'HEAD',
  DELETE = 'DELETE',
}

export const colorForVerb: {[key: string]: string} = {
  [HTTPVerb.POST]: '#f1c40f',
  [HTTPVerb.DELETE]: 'e74c3c',
  [HTTPVerb.HEAD]: '#8e44ad',
  [HTTPVerb.GET]: '#2980b9',
}

export const getFirstDigit = (status: number) => status.toString()[0]

export const statusColorTable: {[key: string ]: string} = {
  2: '#27ae60',
  3: '#2980b9',
  4: '#e74c3c',
  5: '#c0392b',
}

export const isRequest = (eventType: SpanType, direction: SpanDirection) =>
  eventType === SpanType.httpOut && direction === SpanDirection.producer ||
  eventType === SpanType.httpIn && direction === SpanDirection.consumer

export const isResponse = (eventType: SpanType, direction: SpanDirection) => !isRequest(eventType, direction)
