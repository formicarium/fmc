import React from 'react'
import { CreateDevspaceForm, IValues } from '../../components/CreateDevspaceForm';
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { ISystem } from 'common';

import { toast, ToastType } from 'react-toastify';

export class CreateDevspaceContainer extends React.Component {
  private handleSubmit = (system: ISystem) => async (values: IValues) => {
    try {
      await system.soilService.createDevspace(values.name, [])
      toast('🚀 Devspace created!', {
        type: 'success' as ToastType,
      })
    } catch (err) {
      toast('Failed to create! ' + err.toString(), {
        type: 'error' as ToastType,
      })
    }
  }

  public render() {
    return (
      <WithFMCSystem>
        {(system) => (
          <CreateDevspaceForm
            onSubmit={this.handleSubmit(system)}
          />
        )}
      </WithFMCSystem>
    )
  }
}
