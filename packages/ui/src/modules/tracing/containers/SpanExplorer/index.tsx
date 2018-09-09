import React from 'react'
import { WithMessages } from '~/modules/tracing/render-props/MessageList';
import { ExplorerState } from '~/modules/tracing/state/ExplorerState';
import { SpanTree } from '~/modules/tracing/components/SpanTree';
import { Subscribe } from 'unstated';

export class SpanExplorerContainer extends React.Component {
  public render() {
    return (
      <WithMessages>
        {({ messages}) => (
          <Subscribe to={[ExplorerState]}>
          {(explorer: ExplorerState) => (
            <SpanTree
              onOpenNode={explorer.setNodeOpenState}
              onSelectNode={explorer.selectNode}
              messages={messages}
              openMap={explorer.state.openNodesMap}
              selectedMap={explorer.state.selectedNodesMap}
            />
          )}
          </Subscribe>
        )}
      </WithMessages>
    )
  }
}
