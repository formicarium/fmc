import React from 'react'
import { Menu, Icon } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router';

export const SideMenuInner: React.SFC<RouteComponentProps<{}>> = ({
  history,
  location,
  match,
}) => (
  <Menu pointing vertical color='purple'>
    <Menu.Item
      icon={<Icon name='server' />}
      name='Infra'
      active={location.pathname === `${match.url}`}
      onClick={() => history.push(`${match.url}`)}
    />
    <Menu.Item
      icon={<Icon name='code' />}
      name='Services'
      active={location.pathname === `${match.url}/services`}
      onClick={() => history.push(`${match.url}/services`)}
    />
    <Menu.Item
      icon={<Icon name='cog' />}
      name='Settings'
      active={location.pathname === `${match.url}/settings`}
      onClick={() => history.push(`${match.url}/settings`)}
    />
  </Menu>
)

export const SideMenu = withRouter(SideMenuInner)
