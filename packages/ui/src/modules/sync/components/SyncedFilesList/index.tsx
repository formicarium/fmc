import React from 'react'
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';
import { ISyncedFile } from '~/modules/sync/state/SyncState';

const StyleTable = styled(Table)`
  background-color: #fdfdfd;
`
export interface ISyncedFilesListProps {
  syncedFiles: ISyncedFile[]
}
export const SyncedFilesList: React.SFC<ISyncedFilesListProps> = ({
  syncedFiles,
}) => (
  <StyleTable>
    <Table.Body>
    {syncedFiles && syncedFiles.map(({ path, timestamp }) => (
      <Table.Row key={name}>
        <Table.Cell>{path}</Table.Cell>
        <Table.Cell>{timestamp}</Table.Cell>
      </Table.Row>
    ))}
    </Table.Body>
  </StyleTable>
)
