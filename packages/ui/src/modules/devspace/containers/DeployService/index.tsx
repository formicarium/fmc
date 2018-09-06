import React from 'react'
import { DeployServiceForm, IDeployServiceFormValues } from '~/modules/devspace/components/DeployServiceForm';
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { ISystem, IApplicationDefinition, Nullable, IArgs, getTanajuraRemoteName, getTanajuraGitUrl } from 'common';
import { ToastService } from '~/modules/common/services/ToastService';
import _ from 'lodash'

export class DeployServiceContainer extends React.Component {
  private handleSubmit = ({ gitService, filesService, configService, soilService, tanajuraService }: ISystem) => async ({ name, applicationDefinitionPath, argsArray, folder, syncable }: IDeployServiceFormValues) => {
    const { devspace: { tanajuraApiUrl, tanajuraGitUrl } } = await configService.readConfig()
    const currentDevspace = await configService.readDevspaceConfig()
    let applicationDefinition: Nullable<IApplicationDefinition> = null
    if (applicationDefinitionPath) {
      applicationDefinition = await filesService.safelyReadJSON<IApplicationDefinition>(applicationDefinitionPath)
    }
    const argMap: Nullable<IArgs> = argsArray ? argsArray.reduce((acc, item) => ({
      ...acc,
      [item.key]: [item.value],
    }), {}) : null

    try {
      const repoExists = await tanajuraService.repoExists(tanajuraApiUrl, name)
      if (!repoExists) {
        await tanajuraService.createRepo(tanajuraApiUrl, name)
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
      const gitRemoteName = getTanajuraRemoteName(currentDevspace.name)
      const gitRemoteUrl = getTanajuraGitUrl(tanajuraGitUrl, name)
      console.log(gitRemoteName, gitRemoteUrl)
      console.log(folder)
      await gitService.removeRemote(folder, gitRemoteName).catch(_.noop)
      await gitService.addRemote(folder, gitRemoteName, gitRemoteUrl)

      // Push
      await gitService.push(folder, gitRemoteName, 'tanajura')
      ToastService.toastSuccess('⬆️   Pushed to remote repo')

      // Deploy
      await soilService.deployService(currentDevspace.name, name, applicationDefinition, argMap, syncable)
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
