import React from 'react'
import { Segment } from 'semantic-ui-react';
import { DeployServiceContainer } from '~/modules/devspace/containers/DeployService';

export class DeployServicePage extends React.Component {
  public render() {
    return (
      <Segment>
        <DeployServiceContainer />
      </Segment>
    )
  }
}
