import { IGraphDescription, INode, IEdge } from '~/modules/tracing/model/graph';
import { IEventMessage, Direction, EventType } from '~/modules/tracing/model/event';
import * as R from 'ramda'
import { v4 } from 'uuid'
const getReporterId = (event: IEventMessage) => event.meta.service
const getLabel = (event: IEventMessage, index: number) => {
  const { type, direction } = event.payload

  let label = '?'
  if (type === EventType.HTTP && direction === Direction.CONSUMER) {
    label = 'HTTP-REQ'
  }
  if (type === EventType.HTTP && direction === Direction.PRODUCER) {
    label = 'HTTP-RES'
  }

  if (type === EventType.HTTP_OUT && direction === Direction.PRODUCER) {
    label = 'HTTP-REQ'
  }

  if (type === EventType.HTTP_OUT && direction === Direction.CONSUMER) {
    label = 'HTTP-RES'
  }

  if (type === EventType.KAFKA) {
    label = 'KAFKA'
  }

  return `${index} - ${label}`
}

const extractNodeFromEvent = (event: IEventMessage): INode => ({
  id: event.meta.service,
  label: event.meta.service,
})

export const getNodes = (events: IEventMessage[]) => {
  return R.uniqBy(getReporterId, events)
    .map(extractNodeFromEvent)
}

const isConsumer = (event: IEventMessage) => event.payload.direction === Direction.CONSUMER
const isProducer = (event: IEventMessage) => event.payload.direction === Direction.PRODUCER
const getDashes = (event: IEventMessage): boolean => event.payload.type === EventType.KAFKA

export const getEdges = (events: IEventMessage[]): IEdge[] => {
  const uniqEvents = R.uniqBy((event) => `${event.meta.spanId}_${event.payload.direction}`, events)
  return uniqEvents.reduce((edges, event, i) => {
    let from: string
    let to: string
    let label: string
    let dashes: boolean
    let newEdges = []

    if (isConsumer(event)) {
      const childProducers = uniqEvents.filter((ev) => !isConsumer(ev) && ev.meta.parentId === event.meta.spanId)
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
            type: event.payload.type
          }
        } as IEdge]
      }, [])
    }

    if (isProducer(event)) {
      const childConsumer = uniqEvents.filter((ev) => !isProducer(ev) && ev.meta.parentId === event.meta.spanId)
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
            type: event.payload.type,
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

export const getGraphFromEvents = (events: IEventMessage[]): IGraphDescription => ({
  nodes: getNodes(events),
  edges: getEdges(events),
})
