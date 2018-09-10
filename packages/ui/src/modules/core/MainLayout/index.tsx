import React from 'react'
import { Container, Transition } from 'semantic-ui-react';
import { TopMenu } from '../TopMenu';
import { Routes } from '../components/Routes';
import { ToastContainer } from 'react-toastify';
import { SyncState } from '~/modules/sync/state/SyncState';
import styled from 'styled-components';
import {HotKeys} from 'react-hotkeys';
import { withRouter, RouteComponentProps } from 'react-router';
import { Subscribe } from 'unstated';
import { DashboardState } from '~/modules/tracing/state/DashboardState';

interface IMainLayoutProps {
  syncState: SyncState
}
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const RoutesWrapper = styled.div`
  padding-top: 14px;
`
export type IProps = IMainLayoutProps & RouteComponentProps<{}>
export class MainLayoutInner extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)
    const hotModule = (module as any).hot
    if (hotModule) {
      hotModule.dispose(() => {
        props.syncState.clearAllWatchers()
      });
    }
  }
  private map = {
    selectFirstItem: 'command+1',
    selectSecondItem: 'command+2',
    selectThirdItem: 'command+3',
    selectFourthItem: 'command+4',
    selectFifthItem: 'command+5',
  };

  private navigateToItem = (item: string) => () => {
    this.props.history.push(item)
  }

  private handlers = {
    selectFirstItem: this.navigateToItem('/'),
    selectSecondItem: this.navigateToItem('/devspaces/create'),
    selectThirdItem: this.navigateToItem('/my-devspace'),
    selectFourthItem: this.navigateToItem('/tracing'),
    selectFifthItem: this.navigateToItem('/sync'),
  }

  public render() {
    return (
      <HotKeys keyMap={this.map}>
        <HotKeys handlers={this.handlers}>
          <Container style={{paddingTop: 14}}>
            <ToastContainer />
            <Subscribe to={[DashboardState]}>
              {(dashboard: DashboardState) => (
                <Transition visible={!dashboard.state.showFilter} animation='fade down' duration={500}>
                  <MenuWrapper>
                    <TopMenu />
                  </MenuWrapper>
                </Transition>

              )}
            </Subscribe>
            <RoutesWrapper>
              <Routes />
            </RoutesWrapper>
          </Container>
        </HotKeys>
      </HotKeys>
    )
  }
}

export const MainLayout = withRouter(MainLayoutInner)
