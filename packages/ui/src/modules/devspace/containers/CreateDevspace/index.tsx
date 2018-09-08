import React from 'react'
import { CreateDevspaceForm, IValues } from '../../components/CreateDevspaceForm';
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { IApplicationDefinition } from '@formicarium/common';
import { ISystem } from '~/system';
import * as path from 'path'
import * as os from 'os'

import { toast, ToastType } from 'react-toastify';

export class CreateDevspaceContainer extends React.Component {
  private handleSubmit = (system: ISystem) => async (values: IValues) => {
    try {
      const setupFile = path.resolve(os.homedir(), '.fmc/setup.json')
      const setup = await system.filesService.safelyReadJSON<IApplicationDefinition[]>(setupFile)
      await system.soilService.createDevspace(values.name, setup)
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
