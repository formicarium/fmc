import { NodeType, IGraphDescription, INode, IEdge } from './../modules/tracing/model/graph';
import { IEventMessage, MessageType, EventType, Direction } from './../modules/tracing/model/event';
import * as R from 'ramda'

const sortEdgesAlphabetically = (a: IEdge, b: IEdge) => {
  if (a.id < b.id) { return -1; }
  if (a.id > b.id) { return 1; }
  return 0;
}

const createHttpMessage = (timestamp: number, reporter: string, direction: Direction,  spanId: string, traceId: string, parentId?: string): IEventMessage => {
  return {
    id: `ev_${timestamp}`,
    identity: reporter,
    meta: {
      type: MessageType.EVENT,
      timestamp,
      service: reporter,
      traceId,
      spanId,
      parentId,
    },
    payload: {
      type: EventType.HTTP,
      direction,
      data: {
        endpoint: {
          uri: '/blabla',
          service: 'xxx',
        },
      },
    },
  }
}
const createKafkaMessage = (timestamp: number, reporter: string, direction: Direction,  spanId: string, traceId: string, parentId?: string): IEventMessage => {
  return {
    id: `ev_${timestamp}`,
    identity: reporter,
    meta: {
      type: MessageType.EVENT,
      timestamp,
      service: reporter,
      traceId,
      spanId,
      parentId,
    },
    payload: {
      type: EventType.KAFKA,
      direction,
      data: {
        endpoint: {
          topic: 'xablau',
        },
      },
    },
  }
}

const http0 = createHttpMessage(0,	'X',	Direction.PRODUCER,	'O.A'	, 'O', 'O')
const http1 = createHttpMessage(1,	'Y',	Direction.CONSUMER,	'O.A.B', 'O', 'O.A')
const http2 = createHttpMessage(2,	'Y',	Direction.PRODUCER,	'O.A.B.C', 'O',	'O.A.B')
const http3 = createHttpMessage(3,	'Y',	Direction.PRODUCER,	'O.A.B.Cx', 'O', 'O.A.B')
const http4 = createHttpMessage(4,	'Z',	Direction.CONSUMER,	'O.A.B.C.D', 'O',	'O.A.B.C')
const http5 = createHttpMessage(5,	'Z',	Direction.PRODUCER,	'O.A.B.C.D'	, 'O', 'O.A.B.C')
const http6 = createHttpMessage(6,	'Y',	Direction.CONSUMER,	'O.A.B.C'	, 'O',	'O.A.B')
const http7 = createHttpMessage(7,	'W',	Direction.CONSUMER,	'O.A.B.Cx.Dx'	, 'O',	'O.A.B.Cx')
const http8 = createHttpMessage(8,	'W',	Direction.PRODUCER,	'O.A.B.Cx.Dx'	, 'O',	'O.A.B.Cx')
const http9 = createHttpMessage(9,	'Y',	Direction.CONSUMER,	'O.A.B.Cx'	, 'O',	'O.A.B')
const http10 = createHttpMessage(10, 'Y',	Direction.PRODUCER,	'O.A.B',	'O',	'O.A')
const http11 = createHttpMessage(11, 'X',	Direction.CONSUMER,	'O.A',	'O',	'O')
const kafka12 = createKafkaMessage(12,	'Z', Direction.PRODUCER, 'O.A.B.C.D.E',	'O',	'O.A.B.C.D')
const kafka13 = createKafkaMessage(13,	'X', Direction.CONSUMER, 'O.A.B.C.D.E.F',	'O',	'O.A.B.C.D.E')
const kafka14 = createKafkaMessage(14,	'K', Direction.CONSUMER, 'O.A.B.C.D.E.Fx',	'O',	'O.A.B.C.D.E')

const myEvents = [
  http0,
  http1,
  http2,
  http3,
  http4,
  http5,
  http6,
  http7,
  http8,
  http9,
  http10,
  http11,
  kafka12,
  kafka13,
  kafka14,
]
const expectGraph: IGraphDescription = {
  nodes: [{
    id: 'X',
    label: 'X',
    type: NodeType.SERVICE,
  }, {
    id: 'Y',
    label: 'Y',
    type: NodeType.SERVICE,
  }, {
    id: 'Z',
    label: 'Z',
    type: NodeType.SERVICE,
  }, {
    id: 'W',
    label: 'W',
    type: NodeType.SERVICE,
  }, {
    id: 'K',
    label: 'K',
    type: NodeType.SERVICE,
  }],
  edges: [
    {
    id: 'X_Y',
    from: 'X',
    to: 'Y',
    label: 'HTTP',
  },
  {
    id: 'Y_X',
    from: 'Y',
    to: 'X',
    label: 'HTTP',
  },
  {
    id: 'Y_Z',
    from: 'Y',
    to: 'Z',
    label: 'HTTP',
  }, {
    id: 'Z_Y',
    from: 'Z',
    to: 'Y',
    label: 'HTTP',
  }, {
    id: 'Y_W',
    from: 'Y',
    to: 'W',
    label: 'HTTP',
  }, {
    id: 'W_Y',
    from: 'W',
    to: 'Y',
    label: 'HTTP',
  },
  {
    id: 'Z_X',
    from: 'Z',
    to: 'X',
    label: 'KAFKA',
  }, {
    id: 'Z_K',
    from: 'Z',
    to: 'K',
    label: 'KAFKA',
  },
].sort(sortEdgesAlphabetically),
}

const getReporterId = (event: IEventMessage) => event.meta.service

const extractNodeFromEvent = (event: IEventMessage): INode => ({
  id: event.meta.service,
  label: event.meta.service,
  type: NodeType.SERVICE,
})

const getNodes = (events: IEventMessage[]) => {
  return R.uniqBy(getReporterId, events)
    .map(extractNodeFromEvent)
}

const getDepth = (event: IEventMessage) => event.meta.spanId.length

const isOutgoing = (event: IEventMessage) => event.payload.direction === Direction.PRODUCER

const getLabel = (event: IEventMessage) => event.payload.type

const getEdges = (events: IEventMessage[]) => {
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

const getGraphFromEvents = (events: IEventMessage[]): IGraphDescription => ({
  nodes: getNodes(events),
  edges: getEdges(events).sort(sortEdgesAlphabetically),
})

describe('getNodes', () => {
  it('works for a lot of messages', () => {
    const g = getGraphFromEvents(myEvents)
    expect(g).toEqual(expectGraph)
  })
})

describe('getEdeges', () => {
  it('works for a lot of messages', () => {
    const edges = getEdges(myEvents).sort(sortEdgesAlphabetically)
    const expected = expectGraph.edges.sort(sortEdgesAlphabetically)
    expect(edges).toEqual(expected)
  })
})
