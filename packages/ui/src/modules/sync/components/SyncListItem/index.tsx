import React from 'react'
import { Segment } from 'semantic-ui-react';
import { ISync } from '~/modules/sync/state/SyncState';
import { SyncedFilesList } from '~/modules/sync/components/SyncedFilesList';

export interface ISyncedItems {
  path: string,
  timestamp: number
}

export interface ISyncListItemProps extends ISync {
  onBla?: () => void
}
export const SyncListItem: React.SFC<ISyncListItemProps> = ({
  id,
  folder,
  syncedFiles,
}) => (
  <Segment>
    <span>id: {id}</span>
    <span>folder: {folder}</span>

    {syncedFiles && (
      <SyncedFilesList
        syncedFiles={syncedFiles}
      />
    )}
  </Segment>
)
