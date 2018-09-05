import React from 'react'
import './styles.css'
// import 'react-toastify/dist/ReactToastify.min.css';
import { Provider, Subscribe } from 'unstated';
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom';
import { client } from '../../../../system/apollo';
import { MainLayout } from '~/modules/core/MainLayout';
import { Dimmer, Loader } from 'semantic-ui-react';
import { SystemProvider } from '../SystemProvider';
import { Nullable, ISystem, getSystem } from 'common'
import { SyncState } from '~/modules/sync/state/SyncState';

interface IState {
  system: Nullable<ISystem>
}

export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      system: null,
    }
  }
  public async componentDidMount() {
    const system = await getSystem()

    this.setState({
      system,
    })
  }

  public render() {
    if (!this.state.system) {
      return (
        <Dimmer active>
          <Loader indeterminate>Booting system...</Loader>
        </Dimmer>
      )
    }

    return (
      <SystemProvider system={this.state.system}>
        <Provider inject={[new SyncState(this.state.system)]}>
          <ApolloProvider client={client}>
            <Subscribe to={[SyncState]}>
              {(syncState) => (
                <BrowserRouter>
                  <MainLayout syncState={syncState} />
                </BrowserRouter>
              )}
            </Subscribe>
          </ApolloProvider>
        </Provider>
      </SystemProvider>
    )
  }
}
