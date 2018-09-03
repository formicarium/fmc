import React from 'react'
import './styles.css'
import { Provider } from 'unstated';
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom';
import { client } from '../../../../system/apollo';
import { MainLayout } from '../../MainLayout';

export class App extends React.Component {
  public render() {
    return (
      <Provider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <MainLayout />
          </BrowserRouter>
        </ApolloProvider>
      </Provider>

    )
  }
}
