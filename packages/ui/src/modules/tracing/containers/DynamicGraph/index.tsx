import React from 'react'
import { WithMessages } from '../../render-props/MessageList';
import { Subscribe } from 'unstated';
import { EventListState } from '../../state/EventList';
import { Graph } from '../../components/Graph';
import { IEventMessage } from '../../model/event';
import _ from 'lodash'
import { IGraphDescription, IEdge } from '../../model/graph';
import * as R from 'ramda'
import { DashboardState } from '../../state/DashboardState';
import { FilterState } from '../../state/FilterState';
import { getGraphFromEvents } from '~/modules/tracing/logic/event-graph';

const selectMessages = (messages: IEventMessage[], eventListState: EventListState, dashboardState: DashboardState): IEventMessage[] => {
  const {
    selectedIndex,
    cumulative,
    showAll,
  } = eventListState.state

  if (showAll) {
    return messages
  }
  if (cumulative) {
    return messages.slice(0, selectedIndex + 1)
  }

  return messages.slice(selectedIndex, selectedIndex + 1)
}

const isFirstChild = (edge: IEdge): boolean => !edge.parentId

const highlightGraph = (traceId: string, spanId?: string, parentId?: string) => (graph: IGraphDescription): IGraphDescription => {
  return {
    edges: graph.edges.map((edge) => {
      if (!traceId) {
        return edge
      }
      if (edge.traceId !== traceId) {
        return null
      }

      if (isFirstChild(edge)) {
        return {
          ...edge,
          color: '#f39c12',
        }
      }

      return {
        ...edge,
        color: '#f1c40f',
      }

    }).filter(Boolean),
    nodes: graph.nodes,
  }
}
export const DynamicGraph: React.SFC = () => (
  <WithMessages>
    {({ messages }) => (
      <Subscribe to={[EventListState, DashboardState, FilterState]}>
        {(eventListState: EventListState, dashboardState: DashboardState, filterState: FilterState) => (
          <Graph
            graph={R.pipe(
              getGraphFromEvents,
              // highlightGraph(filterState.state.traceId),
            )(selectMessages(messages, eventListState, dashboardState))}
            onSelectEdge={_.noop}
            onDeselectEdge={_.noop}
            onSelectNode={_.noop}
            onDeselectNode={_.noop}
          />
        )}
      </Subscribe>
    )}
  </WithMessages>
)
