import React from 'react'
import { ExplorerState } from '~/modules/tracing/state/ExplorerState';
import { SpanTree } from '~/modules/tracing/components/SpanTree';
import { Subscribe } from 'unstated';
import { WithEvents } from '~/modules/tracing/render-props/WithEvents';

export class SpanExplorerContainer extends React.Component {
  public render() {
    return (
      <WithEvents>
        {({ events }) => (
          <Subscribe to={[ExplorerState]}>
          {(explorer: ExplorerState) => (
            <SpanTree
              onOpenNode={explorer.setNodeOpenState}
              onSelectNode={explorer.selectNode}
              events={events}
              openMap={explorer.state.openNodesMap}
              selectedMap={explorer.state.selectedNodesMap}
            />
          )}
          </Subscribe>
        )}
      </WithEvents>
    )
  }
}
