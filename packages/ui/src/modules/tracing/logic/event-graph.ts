import { NodeType, IGraphDescription, INode, IEdge } from '~/modules/tracing/model/graph';
import { IEventMessage, Direction } from '~/modules/tracing/model/event';
import * as R from 'ramda'

export const sortEdgesAlphabetically = (a: IEdge, b: IEdge) => {
  if (a.id < b.id) { return -1; }
  if (a.id > b.id) { return 1; }
  return 0;
}

const getReporterId = (event: IEventMessage) => event.meta.service
const getDepth = (event: IEventMessage) => event.meta.spanId.length
const isOutgoing = (event: IEventMessage) => event.payload.direction === Direction.PRODUCER
const getLabel = (event: IEventMessage) => event.payload.type

const extractNodeFromEvent = (event: IEventMessage): INode => ({
  id: event.meta.service,
  label: event.meta.service,
  type: NodeType.SERVICE,
})

export const getNodes = (events: IEventMessage[]) => {
  return R.uniqBy(getReporterId, events)
    .map(extractNodeFromEvent)
}

export const getEdges = (events: IEventMessage[]) => {
  return events
    .sort(getDepth)
    .reduce((edges, event, i) => {
      const parentNode = events.find((ev) => ev.meta.spanId === event.meta.parentId)
      if (!parentNode) {
        return edges
      }
      const parentNodeReporterId = getReporterId(parentNode)
      const currentReporterId = getReporterId(event)

      if (parentNodeReporterId === currentReporterId) {
        return edges
      }
      const outgoing = isOutgoing(event)
      const from = outgoing ? currentReporterId : parentNodeReporterId
      const to = outgoing ?  parentNodeReporterId : currentReporterId
      return [
        ...edges, {
          id: `${from}_${to}`,
          from,
          to,
          label: getLabel(event),
        },
      ]
    }, [])
}

export const getGraphFromEvents = (events: IEventMessage[]): IGraphDescription => ({
  nodes: getNodes(events),
  edges: getEdges(events).sort(sortEdgesAlphabetically),
})
