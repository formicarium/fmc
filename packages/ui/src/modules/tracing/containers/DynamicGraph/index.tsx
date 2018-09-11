import React from 'react'
import { Subscribe } from 'unstated';
import _ from 'lodash'
import { graphFromEventsReselect } from '~/modules/tracing/selectors/messages';
import {ExplorerState} from '~/modules/tracing/state/ExplorerState';
import {WithMessages} from '~/modules/tracing/render-props/MessageList';
import {Graph} from '~/modules/tracing/components/Graph';
import { FilterState } from '~/modules/tracing/state/FilterState';
import { DashboardState } from '~/modules/tracing/state/DashboardState';

export const DynamicGraph: React.SFC = () => (
  <WithMessages>
    {({ messages }) => (
      <Subscribe to={[ExplorerState, FilterState, DashboardState]}>
        {(explorer: ExplorerState, filter: FilterState, dashboard: DashboardState) => (
          <Graph
            graph={graphFromEventsReselect({
              messages,
              explorerState: explorer.state,
              filterState: filter.state,
            })}
            onSelectEdge={dashboard.selectEdge}
            onDeselectEdge={dashboard.deselectEdge}
            onSelectNode={_.noop}
            onDeselectNode={_.noop}
          />
        )}
      </Subscribe>
    )}
  </WithMessages>
)
