import React from 'react'
import { Subscribe } from 'unstated';
import _ from 'lodash'
import { getFilteredMessages, memoizedGraphFromEvents } from '~/modules/tracing/selectors/messages';
import {ExplorerState} from '~/modules/tracing/state/ExplorerState';
import {WithMessages} from '~/modules/tracing/render-props/MessageList';
import {Graph} from '~/modules/tracing/components/Graph';

export const DynamicGraph: React.SFC = () => (
  <WithMessages>
    {({ messages }) => (
      <Subscribe to={[ExplorerState]}>
        {(explorerState: ExplorerState) => (
          <Graph
            graph={memoizedGraphFromEvents(getFilteredMessages(messages, explorerState.state.spanFilter))}
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
