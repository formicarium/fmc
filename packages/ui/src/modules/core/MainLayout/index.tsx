import React from 'react'
import { Container, Transition } from 'semantic-ui-react';
import { TopMenu } from '../TopMenu';
import { Routes } from '../components/Routes';
import { ToastContainer } from 'react-toastify';
import { SyncState } from '~/modules/sync/state/SyncState';
import styled from 'styled-components';
// import {HotKeys} from 'react-hotkeys';
import { withRouter, RouteComponentProps } from 'react-router';
import { Subscribe } from 'unstated';
import { DashboardState } from '~/modules/tracing/state/DashboardState';

interface IMainLayoutProps {
  syncState: SyncState
}

const RoutesWrapper = styled.div`
  padding-top: 14px;
  align-self: stretch;
`

const MainLayoutWrapper = styled(Container)`
  padding-top: 14px;
  display: flex !important;
  flex-direction: column;
  align-items: center;
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
  // private map = {
  //   selectFirstItem: 'command+1',
  //   selectSecondItem: 'command+2',
  //   selectThirdItem: 'command+3',
  //   selectFourthItem: 'command+4',
  //   selectFifthItem: 'command+5',
  // };

  private navigateToItem = (item: string) => () => {
    this.props.history.push(item)
  }

  // private handlers = {
  //   selectFirstItem: this.navigateToItem('/'),
  //   selectSecondItem: this.navigateToItem('/devspaces/create'),
  //   selectThirdItem: this.navigateToItem('/my-devspace'),
  //   selectFourthItem: this.navigateToItem('/tracing'),
  //   selectFifthItem: this.navigateToItem('/sync'),
  // }

  public render() {
    return (
      <MainLayoutWrapper>
        <ToastContainer />
        <Subscribe to={[DashboardState]}>
          {(dashboard: DashboardState) => {
            return (
              <Transition visible={!dashboard.state.showFilter || !!dashboard.state.selectedEdge} animation='fade down' duration={300}>
                {/* This div is here because without it, Transition does not work for some reason */}
                <div>
                  <TopMenu />
                </div>
              </Transition>
            )
          }}
        </Subscribe>
        <RoutesWrapper>
          <Routes />
        </RoutesWrapper>
      </MainLayoutWrapper>
    )
  }
}

export const MainLayout = withRouter(MainLayoutInner)
