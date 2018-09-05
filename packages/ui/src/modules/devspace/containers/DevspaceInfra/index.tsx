import React from 'react'
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { ApplicationsList } from '~/modules/application/components/ApplicationsList';
import { PromiseManager } from '~/modules/common/render-props/PromiseManager';
import { DisplayError } from '~/modules/common/components/DisplayError';
import { ISystem } from 'common';
import { ApplicationListPlaceholder } from '~/modules/application/components/ApplicationsList/index.shimmer';

export class DevspaceInfra extends React.Component {
  private fetchInfra = (system: ISystem) => async () => {
    const currentDevspace = await system.configService.readDevspaceConfig()
    const devspace = await system.soilService.getDevspace(currentDevspace.name)
    if (devspace) {
      return [devspace.hive, devspace.tanajura]
    }
    return []
  }
  public render() {
    return (
      <WithFMCSystem>
        {(system) => (
          <PromiseManager
            promise={this.fetchInfra(system)}
            LoadingComponent={() => <ApplicationListPlaceholder n={3} />}
            ErrorComponent={DisplayError}>
            {({ data }) => (
              <ApplicationsList
                applicationsShowingLogs={{}}
                applicationsSyncing={{}}
                applications={data}
                onClickLogs={() => {
                  alert('abre um pr')
                }}
                showDelete={false}
                showRestart={false}
                showSync={false}
              />
            )}
          </PromiseManager>

        )}
      </WithFMCSystem>
    )
  }
}
