import React from 'react'
import { Menu } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router';
import styled from 'styled-components';

const StyledMenu = styled(Menu)`
  z-index: 9999;
  position: relative;
  margin: 0px !important;
`
export const TopMenuInner: React.SFC<RouteComponentProps<{}>> = ({
  history,
}) => (
  <StyledMenu>
    <Menu.Item>
      <img src='https://www.nubank.com.br/images/nu-icon.png'/>
    </Menu.Item>
    <Menu.Item
      active={history.location.pathname === '/'}
      name='Devspaces'
      onClick={() => history.push('/')}
    />
    <Menu.Item
      active={history.location.pathname === '/devspaces/create'}
      name='Create devspace'
      onClick={() => history.push('/devspaces/create')}
    />
    <Menu.Item
      name='My Devspace'
      active={history.location.pathname.indexOf('/my-devspace') !== -1}
      onClick={() => history.push('/my-devspace')}
    />
    <Menu.Item
      name='Debug'
      active={history.location.pathname === '/tracing'}
      onClick={() => history.push('/tracing')}
    />
    <Menu.Item
      name='Sync'
      active={history.location.pathname === '/sync'}
      onClick={() => history.push('/sync')}
    />
  </StyledMenu>
)

export const TopMenu = withRouter(TopMenuInner)
