import { IGraphDescription, NodeType, EventType, EdgeType } from '../model/graph';
import { GROUPS } from '../components/Graph';

export const MY_GRAPH: IGraphDescription = {
  nodes: [
    {id: '1', label: 'Tyrion', group: GROUPS.SERVICES, type: NodeType.SERVICE},
    {id: '2', label: ':NEW_ACCOUNT', group: GROUPS.TOPICS, type: NodeType.TOPIC},
    {id: '3', label: 'Stormshield', group: GROUPS.SERVICES, type: NodeType.SERVICE},
    {id: '4', label: 'Mancini', group: GROUPS.SERVICES, type: NodeType.SERVICE},
    {id: '5', label: 'Corleone', group: GROUPS.SERVICES, type: NodeType.SERVICE},
  ],
  edges: [
    {id: 'A', from: '1', to: '2', label: 'HTTP-IN', type: EdgeType.HTTP},
    {id: 'B', from: '2', to: '1', label: 'HTTP-IN', type: EdgeType.HTTP},
    {id: 'C', from: '1', to: '2', label: 'HTTP-IN', type: EdgeType.HTTP},
    {id: 'D', from: '2', to: '1', label: 'HTTP-IN', type: EdgeType.HTTP},
    {id: 'E', from: '1', to: '3', label: 'KAFKA', type: EdgeType.KAFKA},
    {id: 'F', from: '2', to: '4', label: 'KAFKA', type: EdgeType.KAFKA},
    {id: 'G', from: '2', to: '5', label: 'KAFKA', type: EdgeType.KAFKA},
  ],
}
export const MY_GRAPH_2: IGraphDescription = {
  nodes: [
    {id: '1', label: 'Tyrion', group: GROUPS.SERVICES},
    {id: '2', label: ':NEW_ACCOUNT', group: GROUPS.TOPICS},
    {id: '3', label: 'Stormshield', group: GROUPS.SERVICES},
  ],
  edges: [
    {id: 'A', from: '1', to: '2', label: 'KAFKA'},
    {id: 'B', from: '1', to: '3', label: 'KAFKA'},
  ],
}
