import React from 'react'
import { PromiseManager } from '~/modules/common/render-props/PromiseManager';
import { ObjectInspector } from 'react-inspector';
import * as path from 'path'
import * as os from 'os'
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { IApplicationDefinition, sleep } from '@formicarium/common';
import { ISystem } from '~/system';
import { DisplayError } from '~/modules/common/components/DisplayError';
import { DisplayLocalizedLoader } from '~/modules/common/components/DisplayLoader';

export class DisplaySetupContainer extends React.Component {

  private readSetupFile = (system: ISystem) => async () => {
    const setupFile = path.resolve(os.homedir(), '.fmc/setup.json')
    return system.filesService.safelyReadJSON<IApplicationDefinition[]>(setupFile)
  }

  public render() {
    return (
      <WithFMCSystem>
        {(system) => (
          <PromiseManager
            promise={this.readSetupFile(system)}
            LoadingComponent={DisplayLocalizedLoader}
            ErrorComponent={DisplayError}
            >
            {({ data }) => (
              <ObjectInspector
                data={data}
                expandLevel={10}
              />
              // <ApplicationsList
              //   applications={data}
              // />
            )}
          </PromiseManager>
        )}
      </WithFMCSystem>

    )
  }
}
