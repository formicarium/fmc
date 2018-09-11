import { EventType, Direction } from '~/modules/tracing/model/event';

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

export const isRequest = (eventType: EventType, direction: Direction) => eventType === EventType.HTTP_OUT && direction === Direction.PRODUCER || eventType === EventType.HTTP && direction === Direction.CONSUMER
export const isResponse = (eventType: EventType, direction: Direction) => !isRequest(eventType, direction)
