import React from 'react'
import { Table, Button, Icon } from 'semantic-ui-react';
import { IDevspace } from '@formicarium/common';
import { PromiseButton } from '~/modules/common/components/PromiseButton';

export interface IDevspaceListProps {
  devspaces: IDevspace[]
  onDeleteDevspace: (devspace: IDevspace) => Promise<void>
  onUseDevspace: (devspace: IDevspace) => Promise<void>
  selectedDevspaceName: string
}

export const DevspaceList: React.SFC<IDevspaceListProps> = ({
  devspaces,
  onDeleteDevspace,
  onUseDevspace,
  selectedDevspaceName,
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
            <Button
              basic
              disabled={devspace.name === selectedDevspaceName}
              color={devspace.name === selectedDevspaceName ? 'green' : 'purple'}
              onClick={() => onUseDevspace(devspace)}
            >
              {devspace.name === selectedDevspaceName ? <Icon name='check' color='green' style={{margin: 0}} /> : 'Use'}
            </Button>
          </Table.Cell>
          <Table.Cell width={2} textAlign='center'>
            <PromiseButton color='red' onClick={() => onDeleteDevspace(devspace)}>
              Delete
            </PromiseButton>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)
