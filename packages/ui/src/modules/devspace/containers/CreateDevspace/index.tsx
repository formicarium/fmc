import React from 'react'
import { CreateDevspaceForm } from '../../components/CreateDevspaceForm';
import { HiveService } from '@formicarium/common'

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
