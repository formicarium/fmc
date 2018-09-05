import React from 'react'
import { Segment, List, Header } from 'semantic-ui-react';
import { ISync } from '~/modules/sync/state/SyncState';
import { SyncedFilesList } from '~/modules/sync/components/SyncedFilesList';
import styled from 'styled-components';

export interface ISyncedItems {
  path: string,
  timestamp: number
}

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export interface ISyncListItemProps extends ISync {
  onBla?: () => void
}
export const SyncListItem: React.SFC<ISyncListItemProps> = ({
  devspace,
  applicationName,
  id,
  folder,
  syncedFiles,
}) => (
  <Segment>
    <StyledHeader dividing>
      {applicationName} @{devspace}
    </StyledHeader>
    <Segment tertiary>
      {folder}
    </Segment>
    {syncedFiles && (
      <SyncedFilesList
        syncedFiles={syncedFiles}
      />
    )}
  </Segment>
)
