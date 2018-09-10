import React from 'react'
import { Subscribe } from 'unstated';
import _ from 'lodash'
import { graphFromEventsReselect } from '~/modules/tracing/selectors/messages';
import {ExplorerState} from '~/modules/tracing/state/ExplorerState';
import {WithMessages} from '~/modules/tracing/render-props/MessageList';
import {Graph} from '~/modules/tracing/components/Graph';
import { FilterState } from '~/modules/tracing/state/FilterState';

export const DynamicGraph: React.SFC = () => (
  <WithMessages>
    {({ messages }) => (
      <Subscribe to={[ExplorerState, FilterState]}>
        {(explorer: ExplorerState, filter: FilterState) => (
          <Graph
            graph={graphFromEventsReselect({
              messages,
              explorerState: explorer.state,
              filterState: filter.state,
            })}
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
