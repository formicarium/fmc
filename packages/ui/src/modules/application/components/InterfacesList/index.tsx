import React from 'react'
import { Table } from 'semantic-ui-react';
import { IApplicationLinks } from 'common';
import R from 'ramda'

export interface IInterfacesListProps {
  links: IApplicationLinks
}
export const InterfacesList: React.SFC<IInterfacesListProps> = ({
  links,
}) => (
  <Table style={{backgroundColor: '#fdfdfd'}}>
    <Table.Body>
    {links && R.toPairs(links).map(([name, uri]) => (
      <Table.Row key={name}>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{uri}</Table.Cell>
      </Table.Row>
    ))}
    </Table.Body>
  </Table>
)
