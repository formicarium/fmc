import React from 'react'
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { ApplicationsList } from '~/modules/application/components/ApplicationsList';
import { PromiseManager, PatchData } from '~/modules/common/render-props/PromiseManager';
import { DisplayError } from '~/modules/common/components/DisplayError';
import { IApplication, Nullable } from '@formicarium/common';
import { ISystem } from '~/system';
import { ApplicationListPlaceholder } from '~/modules/application/components/ApplicationsList/index.shimmer';
import { Subscribe } from 'unstated';
import { LogsState } from '~/modules/devspace/state/Logs';
import { SyncState } from '~/modules/sync/state/SyncState';
import electron from 'electron'

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
    const stingerUrl = application.links.stinger as string
    await system.stingerService.restartServiceByUrl(stingerUrl)
  }

  private handleLogs = (logsState: LogsState) => (application: IApplication) => {
    logsState.toggleLogsForApplication(application.name)
  }

  private pickFolderPath = (): Nullable<string> => {
    const path = electron.remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    if (path && path.length) {
      return path[0]
    }
    return null
  }

  private handleToggleSync = (syncState: SyncState, system: ISystem) => async (application: IApplication, sync: boolean) => {
    const currentDevspace = await system.configService.readDevspaceConfig()
    const service = await system.localDB.getService(currentDevspace.name, application.name)

    let repoPath = service && service.repoPath
    if (!repoPath) {
      repoPath = await this.pickFolderPath()
      if (!repoPath) {
        return
      }
      if (repoPath) {
        await system.localDB.registerServiceForDevspace(currentDevspace.name, {
          name: application.name,
          repoPath,
          stingerUrl: '',
        })
      }
    }

    console.log(repoPath)

    if (sync) {
      syncState.startSyncing(currentDevspace.name, application.name, repoPath)
    } else {
      syncState.stopSyncing(currentDevspace.name, application.name)
    }
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
              <Subscribe to={[LogsState, SyncState]}>
              {(logsState: LogsState, syncState: SyncState) => (
                <ApplicationsList
                  applicationsShowingLogs={logsState.state.applicationsShowingLogs}
                  applicationsSyncing={syncState.getApplicationsSyncing()}
                  applications={data}
                  onClickDelete={this.handleDelete(system, patchData, data)}
                  onClickRestart={this.handleRestart(system)}
                  onClickLogs={this.handleLogs(logsState)}
                  onToggleSync={this.handleToggleSync(syncState, system)}
                  showDelete
                  showRestart
                  showSync
                />
              )}
              </Subscribe>
            )}
          </PromiseManager>

        )}
      </WithFMCSystem>
    )
  }
}
