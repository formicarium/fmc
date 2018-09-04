import React from 'react'
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { ApplicationsList } from '~/modules/application/components/ApplicationsList';
import { PromiseManager, PatchData } from '~/modules/common/render-props/PromiseManager';
import { DisplayError } from '~/modules/common/components/DisplayError';
import { ISystem, IApplication } from 'common';
import { ApplicationListPlaceholder } from '~/modules/application/components/ApplicationsList/index.shimmer';

export class DevspaceServices extends React.Component {
  private fetchServices = (system: ISystem) => async () => {
    const currentDevspace = await system.configService.readDevspaceConfig()
    const devspace = await system.soilService.getDevspace(currentDevspace.name)
    return devspace.applications
  }

  private handleDelete = (system: ISystem, patchData: PatchData<IApplication[]>, oldData: IApplication[]) => async (application: IApplication) => {
    const currentDevspace = await system.configService.readDevspaceConfig()
    await system.soilService.deleteService(currentDevspace.name, application.name)
    patchData(oldData.filter((app) => app.name !== application.name))
  }

  private handleRestart = (system: ISystem) => async (application: IApplication) => {
    try {
      // const pod = await system.kubectl.getPodByLabel('sasa', application.name)
      const cp = await system.kubectl.streamLogs('sasa', application.name)
      console.log(cp)
    } catch (err) {
      console.log(err)
    }

    // const stingerUrl = application.links.stinger as string
    // await system.stingerService.restartServiceByUrl(stingerUrl)
  }

  public render() {
    return (
      <WithFMCSystem>
        {(system) => (
          <PromiseManager
            promise={this.fetchServices(system)}
            LoadingComponent={() => <ApplicationListPlaceholder n={3} />}
            ErrorComponent={DisplayError}>
            {({ data }, _, patchData) => (
              <ApplicationsList
                applications={data}
                onClickDelete={this.handleDelete(system, patchData, data)}
                onClickRestart={this.handleRestart(system)}
              />
            )}
          </PromiseManager>

        )}
      </WithFMCSystem>
    )
  }
}
