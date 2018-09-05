import React from 'react'
import { Subscribe } from 'unstated';
import { SyncState } from '~/modules/sync/state/SyncState';
import { SyncList } from '~/modules/sync/components/SyncList';

export class SyncListContainer extends React.Component {
  public render() {
    return (
      <Subscribe to={[SyncState]}>
        {(syncState: SyncState) => (
          <SyncList
            syncs={syncState.getSyncList()}
          />
        )}
      </Subscribe>
    )
  }
}
