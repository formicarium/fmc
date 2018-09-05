import React from 'react'
import { Table, Icon, Popup } from 'semantic-ui-react';
import styled from 'styled-components';
import { ISyncedFile, SyncedFileStatus } from '~/modules/sync/state/SyncState';
import moment from 'moment'

const StyleTable = styled(Table)`
  background-color: #fdfdfd;
`
export interface ISyncedFilesListProps {
  syncedFiles: ISyncedFile[]
}

const DisplaySyncedFileStatus: React.SFC<{status: SyncedFileStatus, error?: Error}> = ({
  status,
  error,
}) => {
  switch (status) {
    case SyncedFileStatus.ERROR:
      return (
        <Popup trigger={<Icon name='close' color='red' />} wide='very'>
          {error ? error.toString() : 'Something wrong!'}
        </Popup>
      )
    case SyncedFileStatus.SYNCED:
      return <Icon name='check' color='green' />
    case SyncedFileStatus.WAITING:
      return <Icon name='clock outline' color='yellow' />
  }
}

export const SyncedFilesList: React.SFC<ISyncedFilesListProps> = ({
  syncedFiles,
}) => (
  <StyleTable>
    <Table.Body>
    {syncedFiles && syncedFiles.map(({ path, timestamp, status, error }) => (
      <Table.Row
        key={timestamp}
        positive={status === SyncedFileStatus.SYNCED}
        negative={status === SyncedFileStatus.ERROR}
        warning={status === SyncedFileStatus.WAITING}>
        <Table.Cell>{path}</Table.Cell>
        <Table.Cell>{moment(timestamp).fromNow()}</Table.Cell>
        <Table.Cell><DisplaySyncedFileStatus status={status} error={error}/></Table.Cell>
      </Table.Row>
    ))}
    </Table.Body>
  </StyleTable>
)
