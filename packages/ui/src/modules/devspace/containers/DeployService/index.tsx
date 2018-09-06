import React from 'react'
import { DeployServiceForm, IDeployServiceFormValues } from '~/modules/devspace/components/DeployServiceForm';
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { ISystem, IApplicationDefinition, Nullable, IArgs, getTanajuraRemoteName, getTanajuraGitUrl } from 'common';
import { ToastService } from '~/modules/common/services/ToastService';
import _ from 'lodash'

export class DeployServiceContainer extends React.Component {
  private syncSetup = async (system: ISystem, folder: string, devspaceName: string, applicationName: string) => {
    const { gitService, configService, tanajuraService } = system
    const { devspace: { tanajuraApiUrl, tanajuraGitUrl } } = await configService.readConfig()
    // Create repo on Tanajura
    const repoExists = await tanajuraService.repoExists(tanajuraApiUrl, applicationName)
    if (!repoExists) {
      await tanajuraService.createRepo(tanajuraApiUrl, applicationName)
      ToastService.toastSuccess('🐜   Created remote repo on Tanajura')
    }

    // Create mirror .git
    if (!await gitService.alreadyHasMirrorRepo(folder)) {
      await gitService.createMirrorRepo(folder)
    }
    ToastService.toastSuccess('🗂   Created mirror git repo')

    // Add in mirror .git
    await gitService.gitAddAll(folder)

    // Commit in mirror .git
    await gitService.gitCommit(folder)

    // Add remote
    const gitRemoteName = getTanajuraRemoteName(devspaceName)
    const gitRemoteUrl = getTanajuraGitUrl(tanajuraGitUrl, applicationName)
    await gitService.removeRemote(folder, gitRemoteName).catch(_.noop)
    await gitService.addRemote(folder, gitRemoteName, gitRemoteUrl)

    // Push
    await gitService.push(folder, gitRemoteName, 'tanajura')
    ToastService.toastSuccess('⬆️   Pushed to remote repo')
  }

  private handleSubmit = (system: ISystem) => async ({ applicationName, applicationDefinitionPath, argsArray, folder, syncable }: IDeployServiceFormValues) => {
    const { filesService, configService, soilService } = system
    const { name: devspaceName } = await configService.readDevspaceConfig()
    let applicationDefinition: Nullable<IApplicationDefinition> = null
    if (applicationDefinitionPath) {
      applicationDefinition = await filesService.safelyReadJSON<IApplicationDefinition>(applicationDefinitionPath)
    }
    const argMap: Nullable<IArgs> = argsArray ? argsArray.reduce((acc, item) => ({
      ...acc,
      [item.key]: [item.value],
    }), {}) : null

    try {
      if (syncable) {
        await this.syncSetup(system, folder, devspaceName, applicationName)
      }
      // Deploy
      await soilService.deployService(devspaceName, applicationName, applicationDefinition, argMap, syncable)
      ToastService.toastSuccess('🚀   Service deployed')
    } catch (err) {
      ToastService.toastError(err.toString())
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
