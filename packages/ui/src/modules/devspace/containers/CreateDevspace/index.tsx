import React from 'react'
import { CreateDevspaceForm, IValues } from '../../components/CreateDevspaceForm';
import { sleep } from 'common';

export class CreateDevspaceContainer extends React.Component {
  private handleSubmit = async (values: IValues) => {
    await sleep(2500)
    console.log(values)
  }
  public render() {
    return (
      <CreateDevspaceForm
        onSubmit={this.handleSubmit}
      />
    )
  }
}
