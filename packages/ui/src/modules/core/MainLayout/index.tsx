import React from 'react'
import { Container } from 'semantic-ui-react';
import { TopMenu } from '../TopMenu';
import { Routes } from '../components/Routes';
import { ToastContainer } from 'react-toastify';
import { SyncState } from '~/modules/sync/state/SyncState';

interface IMainLayoutProps {
  syncState: SyncState
}
export class MainLayout extends React.Component<IMainLayoutProps> {
  constructor(props: IMainLayoutProps) {
    super(props)
    const hotModule = (module as any).hot
    if (hotModule) {
      hotModule.dispose(() => {
        props.syncState.clearAllWatchers()
      });
    }
  }
  public render() {
    return (
      <Container>
        <TopMenu />
        <ToastContainer />
        <Routes />
      </Container>
    )
  }
}
