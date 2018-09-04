import React from 'react'
import { DeployServiceForm, IDeployServiceFormValues } from '~/modules/devspace/components/DeployServiceForm';
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { ISystem, IApplicationDefinition, Nullable, IArgs } from 'common';
import { toast, ToastType } from 'react-toastify';

export class DeployServiceContainer extends React.Component {
  private handleSubmit = (system: ISystem) => async (values: IDeployServiceFormValues) => {
    const currentDevspace = await system.configService.readDevspaceConfig()
    let applicationDefinition: Nullable<IApplicationDefinition> = null
    if (values.applicationDefinitionPath) {
      applicationDefinition = await system.filesService.safelyReadJSON<IApplicationDefinition>(values.applicationDefinitionPath)
    }
    const argMap: Nullable<IArgs> = values.argsArray ? values.argsArray.reduce((acc, item) => ({
      ...acc,
      [item.key]: [item.value],
    }), {}) : null

    try {
      await system.soilService.deployService(currentDevspace.name, values.name, applicationDefinition, argMap)
      toast('🚀 Service deployed', {
        type: 'success' as ToastType,
      })
    } catch (err) {
      toast(err.toString(), {
        type: 'error' as ToastType,
      })
    }

  }

  public render() {
    return (
      <WithFMCSystem>
        {(system) => (
          <DeployServiceForm onSubmit={this.handleSubmit(system)}/>
        )}
      </WithFMCSystem>

    )
  }
}
