import React from 'react'
import { Subscribe } from 'unstated';
import { SyncState } from '~/modules/sync/state/SyncState';
import { SyncList } from '~/modules/sync/components/SyncList';
import { EmptyState } from '~/modules/common/components/EmptyState';

export class SyncListContainer extends React.Component {
  public render() {
    return (
      <Subscribe to={[SyncState]}>
        {(syncState: SyncState) => {
          const syncList = syncState.getSyncList()
          if (syncList && syncList.length) {
            return (
              <SyncList syncs={syncList} />
            )
          }
          return (
            <EmptyState message='Not syncing any files...' />
          )
        }}
      </Subscribe>
    )
  }
}
