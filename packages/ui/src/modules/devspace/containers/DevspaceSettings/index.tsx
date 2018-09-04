import React from 'react'
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { ISystem } from 'common';
import { DevspaceSettings } from '~/modules/devspace/components/DevspaceSettings';
import { toast, ToastType } from 'react-toastify';

export class DevspaceSettingsContainer extends React.Component {
  private handleDeleteNamespace = (system: ISystem) => async () => {
    const currentDevspace = await system.configService.readDevspaceConfig()
    try {
      await system.soilService.deleteDevspace(currentDevspace.name)
      toast(`Devspace deleted!`, {
        type: 'success' as ToastType,
      })
    } catch (err) {
      toast(`${err.toString()}`, {
        type: 'error' as ToastType,
      })
    }
  }

  public render() {
    return (
      <WithFMCSystem>
      {(system) => (
        <DevspaceSettings
          onPressDeleteNamespace={this.handleDeleteNamespace(system)}
        />
      )}
      </WithFMCSystem>
    )
  }
}
