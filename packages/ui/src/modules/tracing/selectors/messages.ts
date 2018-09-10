import { getGraphFromEvents } from '~/modules/tracing/logic/event-graph';
import { IEventMessage } from '~/modules/tracing/model/event';
import memoizeOne from 'memoize-one';
import R from 'ramda'

export const getFilteredMessages = memoizeOne((messages: IEventMessage[], spanFilter: string) => {
  return messages.filter((message) => new RegExp(`${spanFilter}(\\.(.*))?$`).test(message.meta.spanId))
})

const getTimestamp = (message: IEventMessage) => message.meta.timestamp
export const getSortedMessages = memoizeOne((messages: IEventMessage[]) => R.sortBy(getTimestamp, messages))

export const memoizedGraphFromEvents = memoizeOne((events: IEventMessage[]) => getGraphFromEvents(events))
