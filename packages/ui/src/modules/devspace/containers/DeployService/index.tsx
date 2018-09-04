import React from 'react'
import { DeployServiceForm, IDeployServiceFormValues } from '~/modules/devspace/components/DeployServiceForm';

export class DeployServiceContainer extends React.Component {
  private handleSubmit = async (values: IDeployServiceFormValues) => {
    console.log(values)
  }

  public render() {
    return (
      <DeployServiceForm
        onSubmit={this.handleSubmit}
      />
    )
  }
}
