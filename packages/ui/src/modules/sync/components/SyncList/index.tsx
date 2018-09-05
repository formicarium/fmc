import React from 'react'
import { ISync } from '~/modules/sync/state/SyncState';
import { SyncListItem } from '~/modules/sync/components/SyncListItem';

export interface ISyncListProps {
  onBla?: () => void
  syncs: ISync[]
}

export const SyncList: React.SFC<ISyncListProps> = ({
  syncs,
}) => (
  <div>
    {syncs && syncs.map((sync) => (
      <SyncListItem
        key={sync.id}
        {...sync}
      />
    ))}
  </div>
)
