import React from 'react'
import { Menu } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router';

export const TopMenuInner: React.SFC<RouteComponentProps<{}>> = ({
  history,
}) => (
  <Menu>
    <Menu.Item>
      <img src='https://www.nubank.com.br/images/nu-icon.png'/>
    </Menu.Item>
    <Menu.Item
      active={history.location.pathname === '/'}
      name='Devspaces'
      onClick={(e, { name }) => history.push('/')}
    />
    <Menu.Item
      active={history.location.pathname === '/devspaces/create'}
      name='Create devspace'
      onClick={(e, { name }) => history.push('/devspaces/create')}
    />
    <Menu.Item
      name='My Devspace'
      active={history.location.pathname.indexOf('/my-devspace') !== -1}
      onClick={(e, { name }) => history.push('/my-devspace')}
    />
    <Menu.Item
      name='Tracing'
      active={history.location.pathname === '/tracing'}
      onClick={(e, { name }) => history.push('/tracing')}
    />
  </Menu>
)

export const TopMenu = withRouter(TopMenuInner)
