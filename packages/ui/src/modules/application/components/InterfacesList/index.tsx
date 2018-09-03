import React from 'react'
import { Table } from 'semantic-ui-react';

export interface IInterface {
  name: string
  link: string
}

export interface IInterfacesListProps {
  interfaces: IInterface[]
}
export const InterfacesList: React.SFC<IInterfacesListProps> = ({
  interfaces,
}) => (
  <Table style={{backgroundColor: '#fdfdfd'}}>
    <Table.Body>
    {interfaces && interfaces.map((interfacee) => (
      <Table.Row key={interfacee.name}>
        <Table.Cell>{interfacee.name}</Table.Cell>
        <Table.Cell>{interfacee.link}</Table.Cell>
      </Table.Row>
    ))}
    </Table.Body>
  </Table>
)
