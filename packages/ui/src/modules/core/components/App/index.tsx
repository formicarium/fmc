import React from 'react'
import './styles.css'
import { Provider } from 'unstated';
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom';
import { client } from '../../../../system/apollo';
import { MainLayout } from '../../MainLayout';
import { sum } from '@formicarium/common';
import { Dimmer, Loader } from 'semantic-ui-react';
import { SystemProvider } from '../SystemProvider';

console.log(sum(1, 5))
interface IState {
  // system: Nullable<ISystem>
}

export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      system: null,
    }
  }
  public async componentDidMount() {
    // const system = await getSystem()
    // this.setState({
    //   system,
    // })
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
      // <SystemProvider system={this.state.system}>
        <Provider>
          <ApolloProvider client={client}>
            <BrowserRouter>
              <MainLayout />
            </BrowserRouter>
          </ApolloProvider>
        </Provider>
      // </SystemProvider>
    )
  }
}
