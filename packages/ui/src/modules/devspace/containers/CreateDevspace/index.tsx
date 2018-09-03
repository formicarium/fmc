import React from 'react'
import { CreateDevspaceForm } from '../../components/CreateDevspaceForm';

export class CreateDevspace extends React.Component {
  private handleSubmit = () => {

  }
  public render() {
    return (
      <CreateDevspaceForm
        onSubmit={this.handleSubmit}
      />
    )
  }
}
