import React from 'react'
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { ApplicationsList } from '~/modules/application/components/ApplicationsList';
import { PromiseManager } from '~/modules/common/render-props/PromiseManager';
import { DisplayLoader } from '~/modules/common/components/DisplayLoader';
import { DisplayError } from '~/modules/common/components/DisplayError';
import { ISystem } from 'common';

export class DevspaceServices extends React.Component {
  private fetchServices = (system: ISystem) => async () => {
    const currentDevspace = await system.configService.readDevspaceConfig()
    const devspace = await system.soilService.getDevspace(currentDevspace.name)
    return devspace.applications
  }
  public render() {
    return (
      <WithFMCSystem>
        {(system) => (
          <PromiseManager promise={this.fetchServices(system)} LoadingComponent={DisplayLoader} ErrorComponent={DisplayError}>
            {({ data}) => (
              <ApplicationsList
                applications={data}
              />
            )}
          </PromiseManager>

        )}
      </WithFMCSystem>
    )
  }
}
