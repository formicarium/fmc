import { IGraphDescription, INode, IEdge } from '~/modules/tracing/model/graph';
import { v4 } from 'uuid'
import { IEvent, SpanDirection, SpanType } from '~/modules/tracing/graphql/queries/events';
import R from 'ramda'

const getParentIdFromEvent = (event: IEvent): string => R.pathOr('', ['payload', 'context', 'parentId'], event)
const getSpanIdFromEvent = (event: IEvent): string => R.pathOr('', ['payload', 'context', 'spanId'], event)
const getDirectionFromEvent = (event: IEvent): SpanDirection => R.pathOr('', ['payload', 'tags', 'direction'], event)
const getTypeFromEvent = (event: IEvent): SpanType => R.pathOr('', ['payload', 'tags', 'type'], event)

const getReporterId = (event: IEvent) => event.meta.service
const getLabel = (event: IEvent, index: number) => {
  const type = getTypeFromEvent(event)
  const direction = getDirectionFromEvent(event)

  let label = '?'
  if (type === SpanType.httpIn && direction === SpanDirection.consumer) {
    label = 'HTTP-REQ'
  }
  if (type === SpanType.httpIn && direction === SpanDirection.producer) {
    label = 'HTTP-RES'
  }

  if (type === SpanType.httpOut && direction === SpanDirection.producer) {
    label = 'HTTP-REQ'
  }

  if (type === SpanType.httpOut && direction === SpanDirection.consumer) {
    label = 'HTTP-RES'
  }

  if (type === SpanType.kafka) {
    label = 'KAFKA'
  }

  return `${index} - ${label}`
}

const extractNodeFromEvent = (event: IEvent): INode => ({
  id: event.meta.service,
  label: event.meta.service,
})

export const getNodes = (events: IEvent[]) => {
  return R.uniqBy(getReporterId, events)
    .map(extractNodeFromEvent)
}

const isConsumer = (event: IEvent) => getDirectionFromEvent(event) === SpanDirection.consumer
const isProducer = (event: IEvent) => getDirectionFromEvent(event) === SpanDirection.producer
const getDashes = (event: IEvent): boolean => getTypeFromEvent(event) === SpanType.kafka

export const getEdges = (events: IEvent[]): IEdge[] => {
  const uniqEvents = R.uniqBy((event) => `${getSpanIdFromEvent(event)}_${getDirectionFromEvent(event)}`, events)
  return uniqEvents.reduce((edges, event, i) => {
    let from: string
    let to: string
    let label: string
    let dashes: boolean
    let newEdges = []

    if (isConsumer(event)) {
      const childProducers = uniqEvents.filter((ev) => !isConsumer(ev) && getParentIdFromEvent(event) === getSpanIdFromEvent(event))
      if (!childProducers.length) { return edges }
      to = getReporterId(event)
      label = getLabel(event, i)
      dashes = getDashes(event)

      newEdges = childProducers.reduce((accNewEdges, prod) => {
        from = getReporterId(prod)
        if (from === to) {
          return accNewEdges
        }
        return [...accNewEdges, {
          dashes,
          id: `${from}_${to}_${v4()}`,
          from,
          to,
          label,
          metadata: {
            fromEvent: prod.id,
            toEvent: event.id,
            type: getTypeFromEvent(event),
          }
        } as IEdge]
      }, [])
    }

    if (isProducer(event)) {
      const childConsumer = uniqEvents.filter((ev) => !isProducer(ev) && getParentIdFromEvent(event) === getSpanIdFromEvent(event))
      if (!childConsumer.length) { return edges }
      from = getReporterId(event)
      label = getLabel(event, i)
      dashes = getDashes(event)

      newEdges = childConsumer.reduce((accNewEdges, cons) => {
        to = getReporterId(cons)
        if (from === to) {
          return accNewEdges
        }
        return [...accNewEdges, {
          dashes,
          id: `${from}_${to}_${v4()}`,
          from,
          to,
          label,
          metadata: {
            fromEvent: event.id,
            toEvent: cons.id,
            type: getTypeFromEvent(event),
          }
        } as IEdge]
      }, [])
    }
    return [
      ...edges,
      ...newEdges,
    ]
  }, [])
}

export const getGraphFromEvents = (events: IEvent[]): IGraphDescription => ({
  nodes: getNodes(events),
  edges: getEdges(events),
})
