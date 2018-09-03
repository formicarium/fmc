import { extractNodesFromEventMessage, getUniqueNodes, extractHttpEdgeFromEvent, extractKafkaEdgeFromEvent, buildGraphFromEventMessages } from '../logic/event-graph';
import { IEventMessage, MessageType, HttpDirection, EventType, KafkaDirection } from '../model/event';
import { NodeType, EdgeType } from '../model/graph';

const exampleKafkaMessage: IEventMessage = {
  id: '1',
  identity: 'service-1',
  meta: {
    type: MessageType.EVENT,
    timestamp: new Date(),
    service: 'service-1',
  },
  payload: {
    type: EventType.KAFKA,
    direction: KafkaDirection.CONSUMER,
    data: {
      endpoint: {
        topic: 'topic-1',
      },
    },
  },
}
const exampleHttpMessage: IEventMessage = {
  id: '1',
  identity: 'service-1',
  meta: {
    type: MessageType.EVENT,
    timestamp: new Date(),
    service: 'service-1',
  },
  payload: {
    type: EventType.HTTP,
    direction: HttpDirection.IN_REQUEST,
    data: {
      endpoint: {
        uri: '/blabla',
        service: 'service-2',
      },
    },
  },
}

const exampleHttpOutMessage: IEventMessage = {
  id: '1',
  identity: 'service-1',
  meta: {
    type: MessageType.EVENT,
    timestamp: new Date(),
    service: 'service-1',
  },
  payload: {
    type: EventType.HTTP,
    direction: HttpDirection.OUT_REQUEST,
    data: {
      endpoint: {
        uri: '/blabla',
        service: 'service-2',
      },
    },
  },
}

const exampleKafkaProduceMessage: IEventMessage = {
  id: '1',
  identity: 'service-1',
  meta: {
    type: MessageType.EVENT,
    timestamp: new Date(),
    service: 'service-1',
  },
  payload: {
    type: EventType.KAFKA,
    direction: KafkaDirection.PRODUCER,
    data: {
      endpoint: {
        topic: 'topic-2',
      },
    },
  },
}

describe('extractNodesFromEventMessage', () => {
  it('should extract nodes from kafka message', () => {
    expect(extractNodesFromEventMessage(exampleKafkaMessage)).toEqual([{
      id: 'service-1',
      label: 'service-1',
      type: NodeType.SERVICE,
    }, {
      id: 'topic-1',
      label: 'topic-1',
      type: NodeType.TOPIC,
    }])
  });

  it('should extract nodes from http message', () => {
    expect(extractNodesFromEventMessage(exampleHttpMessage)).toEqual([{
      id: 'service-1',
      label: 'service-1',
      type: NodeType.SERVICE,
    }, {
      id: 'service-2',
      label: 'service-2',
      type: NodeType.SERVICE,
    }])
  });
});

describe('getUniqueNodes', () => {
  it('should get unique nodes from list with repeating nodes', () => {
    const repeatedNodes = [{
      id: 'service-1',
      label: 'service-1',
      type: NodeType.SERVICE,
    }, {
      id: 'topic-1',
      label: 'topic-1',
      type: NodeType.TOPIC,
    }, {
      id: 'service-1',
      label: 'service-2',
      type: NodeType.SERVICE,
    }]

    expect(getUniqueNodes(repeatedNodes)).toEqual([{
      id: 'service-1',
      label: 'service-1',
      type: NodeType.SERVICE,
    }, {
      id: 'topic-1',
      label: 'topic-1',
      type: NodeType.TOPIC,
    }])
  })

  it ('should get unique nodes from list with no repeating nodes', () => {
    const repeatedNodes = [{
      id: 'service-1',
      label: 'service-1',
      type: NodeType.SERVICE,
    }, {
      id: 'topic-1',
      label: 'topic-1',
      type: NodeType.TOPIC,
    }]
    expect(getUniqueNodes(repeatedNodes)).toEqual([{
      id: 'service-1',
      label: 'service-1',
      type: NodeType.SERVICE,
    }, {
      id: 'topic-1',
      label: 'topic-1',
      type: NodeType.TOPIC,
    }])
  })
});

describe('extractHttpEdgeFromEvent', () => {
  it('extracts edge from http IN message', () => {
    expect(extractHttpEdgeFromEvent(exampleHttpMessage)).toEqual({
      id: 'service-2->service-1',
      from: 'service-2',
      to: 'service-1',
      label: 'HTTP',
      type: EdgeType.HTTP,
    })
  });

  it('extracts edge from http OUT message', () => {
    expect(extractHttpEdgeFromEvent(exampleHttpOutMessage)).toEqual({
      id: 'service-1->service-2',
      from: 'service-1',
      to: 'service-2',
      label: 'HTTP',
      type: EdgeType.HTTP,
    })
  });

  it('extracts edge from kafka CONSUME message', () => {
    expect(extractKafkaEdgeFromEvent(exampleKafkaMessage)).toEqual({
      id: 'topic-1->service-1',
      from: 'topic-1',
      to: 'service-1',
      label: 'KAFKA',
      type: EdgeType.KAFKA,
    })
  });

  it('extracts edge from kafka PRODUCE message', () => {
    expect(extractKafkaEdgeFromEvent(exampleKafkaProduceMessage)).toEqual({
      id: 'service-1->topic-2',
      from: 'service-1',
      to: 'topic-2',
      label: 'KAFKA',
      type: EdgeType.KAFKA,
    })
  });
});

describe('buildGraphFromEventMessages', () => {
  it('build graph from messages', () => {
    const messages = [
      exampleHttpMessage,
      exampleHttpOutMessage,
      exampleKafkaMessage,
      exampleKafkaProduceMessage,
    ]
    const graph = buildGraphFromEventMessages(messages)

    expect(graph).toEqual({
      edges: [{
        from: 'service-2',
        id: 'service-2->service-1',
        label: 'HTTP',
        to: 'service-1',
        type: 'HTTP',
      }, {
        from: 'service-1',
        id: 'service-1->service-2',
        label: 'HTTP',
        to: 'service-2',
        type: 'HTTP',
      }, {
        from: 'topic-1',
        id: 'topic-1->service-1',
        label: 'KAFKA',
        to: 'service-1',
        type: 'KAFKA',
      }, {
        from: 'service-1',
        id: 'service-1->topic-2',
        label: 'KAFKA',
        to: 'topic-2',
        type: 'KAFKA',
      }],
      nodes: [{
        id: 'service-1',
        label: 'service-1',
        type: 'SERVICE',
      }, {
        id: 'service-2',
        label: 'service-2',
        type: 'SERVICE',
      }, {
        id: 'topic-1',
        label: 'topic-1',
        type: 'TOPIC',
      }, {
        id: 'topic-2',
        label: 'topic-2',
        type: 'TOPIC',
      }],
    })
  });
});
