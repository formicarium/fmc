import { NodeType, IGraphDescription, INode, IEdge } from '~/modules/tracing/model/graph';
import { IEventMessage, Direction, EventType } from '~/modules/tracing/model/event';
import * as R from 'ramda'
import { v4 } from 'uuid'

export const sortEdgesAlphabetically = (a: IEdge, b: IEdge) => {
  if (a.id < b.id) { return -1; }
  if (a.id > b.id) { return 1; }
  return 0;
}

const getReporterId = (event: IEventMessage) => event.meta.service
const getDepth = (event: IEventMessage) => event.meta.spanId.length
const isOutgoing = (event: IEventMessage) => event.payload.direction === Direction.PRODUCER
const getLabel = (event: IEventMessage) => {
  const { type, direction } = event.payload
  if (type === EventType.HTTP && direction === Direction.CONSUMER) {
    return 'HTTP-REQ'
  }
  if (type === EventType.HTTP && direction === Direction.PRODUCER) {
    return 'HTTP-RES'
  }

  if (type === EventType.HTTP_OUT && direction === Direction.PRODUCER) {
    return 'HTTP-REQ'
  }

  if (type === EventType.HTTP_OUT && direction === Direction.CONSUMER) {
    return 'HTTP-RES'
  }

  if (type === EventType.KAFKA) {
    return 'KAFKA'
  }

  return '?'
}

const extractNodeFromEvent = (event: IEventMessage): INode => ({
  id: event.meta.service,
  label: event.meta.service,
  type: NodeType.SERVICE,
})

export const getNodes = (events: IEventMessage[]) => {
  return R.uniqBy(getReporterId, events)
    .map(extractNodeFromEvent)
}

const isConsumer = (event: IEventMessage) => event.payload.direction === Direction.CONSUMER
const isProducer = (event: IEventMessage) => event.payload.direction === Direction.PRODUCER

export const getEdges = (events: IEventMessage[]) => {
  return events.reduce((edges, event) => {
    let from
    let to
    let label
    if (isConsumer(event)) {
      const childProducer = events.find((ev) => !isConsumer(ev) && ev.meta.parentId === event.meta.spanId)
      if (!childProducer) { return edges }
      from = getReporterId(childProducer)
      to = getReporterId(event)
      label = getLabel(event)
    }

    if (isProducer(event)) {
      const childConsumer = events.find((ev) => !isProducer(ev) && ev.meta.parentId === event.meta.spanId)
      if (!childConsumer) { return edges }
      from = getReporterId(event)
      to = getReporterId(childConsumer)
      label = getLabel(event)
    }

    if (from === to) {
      return edges
    }
    return [
      ...edges, {
        id: `${from}_${to}_${v4()}`,
        from,
        to,
        label,
      },
    ]
  }, [])
}

export const getGraphFromEvents = (events: IEventMessage[]): IGraphDescription => ({
  nodes: getNodes(events),
  edges: getEdges(events).sort(sortEdgesAlphabetically),
})
