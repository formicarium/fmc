import React from 'react'
import { CreateDevspaceForm, IValues } from '../../components/CreateDevspaceForm';
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { ISystem, IApplicationDefinition } from 'common';

export class CreateDevspaceContainer extends React.Component {
  private handleSubmit = (system: ISystem) => async (values: IValues) => {
    return system.soilService.createDevspace(values.name, [])
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
