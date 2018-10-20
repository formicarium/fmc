import React from 'react'
import { Subscribe } from 'unstated';
import _ from 'lodash'
import { graphFromEventsReselect } from '~/modules/tracing/selectors/messages';
import {ExplorerState} from '~/modules/tracing/state/ExplorerState';
import {Graph} from '~/modules/tracing/components/Graph';
import { FilterState } from '~/modules/tracing/state/FilterState';
import { DashboardState } from '~/modules/tracing/state/DashboardState';
import { WithEvents } from '~/modules/tracing/render-props/WithEvents';

export const DynamicGraph: React.SFC = () => (
  <WithEvents>
    {({ events }) => (
      <Subscribe to={[ExplorerState, FilterState, DashboardState]}>
        {(explorer: ExplorerState, filter: FilterState, dashboard: DashboardState) => {
          const graph = graphFromEventsReselect({
            events,
            explorerState: explorer.state,
            filterState: filter.state,
          })
          return (
            <Graph
              graph={graph}
              onSelectEdge={dashboard.selectEdge}
              onDeselectEdge={dashboard.deselectEdge}
              onSelectNode={_.noop}
              onDeselectNode={_.noop}
            />
          )
        }}
      </Subscribe>
    )}
  </WithEvents>
)
