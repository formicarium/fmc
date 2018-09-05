import React from 'react'
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { ApplicationsList } from '~/modules/application/components/ApplicationsList';
import { PromiseManager } from '~/modules/common/render-props/PromiseManager';
import { DisplayError } from '~/modules/common/components/DisplayError';
import { ISystem, sleep } from 'common';
import { ApplicationListPlaceholder } from '~/modules/application/components/ApplicationsList/index.shimmer';

export class DevspaceInfra extends React.Component {
  private fetchInfra = (system: ISystem) => async () => {
    await sleep(1000)
    const currentDevspace = await system.configService.readDevspaceConfig()
    const devspace = await system.soilService.getDevspace(currentDevspace.name)
    return [devspace.hive, devspace.tanajura]
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
                applications={data}
                onClickDelete={() => {
                  alert('abre um pr')
                }}
                onClickRestart={() => {
                  alert('abre um pr')
                }}
                onClickLogs={() => {
                  alert('abre um pr')
                }}
                showDelete={false}
                showRestart={false}
              />
            )}
          </PromiseManager>

        )}
      </WithFMCSystem>
    )
  }
}
