import React from 'react'
import { Container } from 'semantic-ui-react';
import { TopMenu } from '../TopMenu';
import { Routes } from '../components/Routes';
import { ToastContainer } from 'react-toastify';

export class MainLayout extends React.Component {
  constructor(props) {
    super(props)
    if (module.hot) {
      module.hot.dispose(function() {
        console.log('dispose')
        props.syncState.clearAllWatchers()
      });

      module.hot.accept(function() {
        console.log('accept')
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
