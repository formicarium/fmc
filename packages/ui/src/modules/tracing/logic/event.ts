import R from 'ramda'
import { IEvent, SpanDirection, SpanType } from '~/modules/tracing/graphql/queries/events';

export const getParentIdFromEvent = (event: IEvent): string => R.pathOr('', ['payload', 'context', 'parentId'], event)
export const getSpanIdFromEvent = (event: IEvent): string => R.pathOr('', ['payload', 'context', 'spanId'], event)
export const getDirectionFromEvent = (event: IEvent): SpanDirection => R.pathOr('', ['payload', 'tags', 'direction'], event)
export const getTypeFromEvent = (event: IEvent): SpanType => R.pathOr('', ['payload', 'tags', 'type'], event)
export const getReporterId = (event: IEvent) => event.meta.service
export const getTimestampFromEvent = (event: IEvent) => R.pathOr(null, ['payload', 'timestamp'], event)
