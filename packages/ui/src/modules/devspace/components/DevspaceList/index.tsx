import React from 'react'
import { Table, Button, Icon } from 'semantic-ui-react';
import { IDevspace } from 'common';
import { PromiseButton } from '~/modules/common/components/PromiseButton';

export interface IDevspaceListProps {
  devspaces: IDevspace[]
  onDeleteDevspace: (devspace: IDevspace) => Promise<void>
  onUseDevspace: (devspace: IDevspace) => Promise<void>
}

export const DevspaceList: React.SFC<IDevspaceListProps> = ({
  devspaces,
  onDeleteDevspace,
  onUseDevspace,
}) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {devspaces && devspaces.map((devspace) => (
        <Table.Row key={devspace.name}>
          <Table.Cell width={12}>{devspace.name}</Table.Cell>
          <Table.Cell width={2} textAlign='center'>
            <PromiseButton
              basic={devspace.name !== 'devspcae 1'}
              disabled={devspace.name === 'devspcae 1'}
              color='purple'
              onClick={() => onUseDevspace(devspace)}
            >
              Use
            </PromiseButton>
          </Table.Cell>
          <Table.Cell width={2} textAlign='center'>
            <Button color='red' onClick={() => onDeleteDevspace(devspace)}>
              Delete
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)
