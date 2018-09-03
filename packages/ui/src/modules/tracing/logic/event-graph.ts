import { EventType, IEventMessage, HttpDirection, IHttpPayload, IKafkaPayload, KafkaDirection } from '../model/event';
import { INode, NodeType, IEdge, EdgeType, IGraphDescription } from '../model/graph';
import { uniqBy } from 'ramda'

const buildServiceNode = (id: string, label: string): INode => ({
  type: NodeType.SERVICE,
  id,
  label,
})

const buildTopicNode = (id: string, label: string): INode => ({
  type: NodeType.TOPIC,
  id,
  label,
})

const buildHttpEdge = (id: string, from: string, to: string, traceId: string, spanId: string, parentId?: string): IEdge => ({
  id,
  from,
  to,
  label: `${EdgeType.HTTP} [${spanId.toUpperCase()}]`,
  traceId,
  spanId,
  parentId,
  type: EdgeType.HTTP,
})

const buildKafkaEdge = (id: string, from: string, to: string, traceId: string, spanId: string, parentId?: string): IEdge => ({
  id,
  from,
  to,
  label: `${EdgeType.KAFKA} [${spanId.toUpperCase()}]`,
  traceId,
  spanId,
  parentId,
  type: EdgeType.KAFKA,
})

export const extractNodesFromEventMessage = (event: IEventMessage): INode[] => {
  switch (event.payload.type) {
    case EventType.HTTP:
      return [
        buildServiceNode(event.meta.service, event.meta.service),
        buildServiceNode(event.payload.data.endpoint.service, event.payload.data.endpoint.service),
      ]
    case EventType.KAFKA:
      return [
        buildServiceNode(event.meta.service, event.meta.service),
        buildTopicNode(event.payload.data.endpoint.topic, event.payload.data.endpoint.topic),
      ]
  }
}

const getNodeId = (node: INode): string => node.id
export const getUniqueNodes = uniqBy<INode, string>(getNodeId)

export interface IFromTo {
  from: string,
  to: string
}
const getFromToHttp = (direction: HttpDirection, reporter: string, target: string): IFromTo => {
  switch (direction) {
    case HttpDirection.IN_REQUEST:
      return {
        from: target,
        to: reporter,
      }
    case HttpDirection.OUT_REQUEST:
      return {
        from: reporter,
        to: target,
      }
  }
}
const getFromToKafka = (direction: KafkaDirection, reporter: string, target: string): IFromTo => {
  switch (direction) {
    case KafkaDirection.PRODUCER:
      return {
        from: reporter,
        to: target,
      }
    case KafkaDirection.CONSUMER:
      return {
        from: target,
        to: reporter,
      }
  }
}

const buildEdgeId = (spanId: string) => `${spanId}`

export const extractHttpEdgeFromEvent = (event: IEventMessage): IEdge => {
  const payload = event.payload as IHttpPayload
  const { traceId, spanId, parentId, service: reporter } = event.meta
  const target = payload.data.endpoint.service
  const { from, to } = getFromToHttp(payload.direction, reporter, target)
  const id = buildEdgeId(event.meta.spanId)
  return buildHttpEdge(id, from, to, traceId, spanId, parentId)
}

export const extractKafkaEdgeFromEvent = (event: IEventMessage): IEdge => {
  const payload = event.payload as IKafkaPayload
  const { traceId, spanId, parentId, service: reporter } = event.meta
  const target = payload.data.endpoint.topic
  const { from, to } = getFromToKafka(payload.direction, reporter, target)
  const id = buildEdgeId(event.meta.spanId)
  return buildKafkaEdge(id, from, to, traceId, spanId, parentId)
}
export const extractEdgeFromEventMessage = (event: IEventMessage): IEdge => {
  switch (event.payload.type) {
    case EventType.HTTP:
      return extractHttpEdgeFromEvent(event)
    case EventType.KAFKA:
      return extractKafkaEdgeFromEvent(event)
  }
}

export const buildGraphFromEventMessages = (events: IEventMessage[]): IGraphDescription => {
  return {
    edges: events.reduce((edges, event) => ([
        ...edges,
        extractEdgeFromEventMessage(event),
    ]), []),
    nodes: getUniqueNodes(events.reduce((nodes, event) => ([
      ...nodes,
      ...extractNodesFromEventMessage(event),
    ]), [])),
  }
}
