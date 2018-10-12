import React from 'react'
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { ISystem } from '~/system';
import { ISettingsFormValue, SettingsForm } from '~/modules/settings/components/SettingsForm';
import { ToastService } from '~/modules/common/services/ToastService';
import { PromiseManager } from '~/modules/common/render-props/PromiseManager';
import { DisplayLoader } from '~/modules/common/components/DisplayLoader';
import { DisplayError } from '~/modules/common/components/DisplayError';
import { IKubectlVersion, Nullable } from '@formicarium/common';

export interface ISettingsContainerState {
  initialValues: Partial<ISettingsFormValue>
  lastObtainedVersion: Nullable<IKubectlVersion>
}
export class SettingsContainer extends React.Component<{}, ISettingsContainerState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      initialValues: {},
      lastObtainedVersion: null,
    }
  }

  private handleSubmit = (system: ISystem) => async (values: ISettingsFormValue) => {
    try {
      await Promise.all([
        system.jsonStorage.set('kubectlBin', values.kubectlBin),
        system.jsonStorage.set('kubectlContext', values.kubectlContext)
      ])

      ToastService.toastSuccess('📝 Settings saved!')
    } catch (err) {
      ToastService.toastSuccess(`Failed to save! ${err.toString()}`)
    }
  }

  private loadInitialValues = (system: ISystem) =>
    (): Promise<Partial<ISettingsFormValue>> =>
      Promise.all([
        system.jsonStorage.get<string>('kubectlBin'),
        system.jsonStorage.get<string>('kubectlContext'),
      ])
      .then(([ kubectlBin, kubectlContext ]) => ({ kubectlBin, kubectlContext }))

  private setLastObtainedVersion = (lastObtainedVersion: IKubectlVersion) => this.setState({
    lastObtainedVersion,
  })
  public render() {
    return (
      <WithFMCSystem>
        {(system) => (
          <PromiseManager
            promise={this.loadInitialValues(system)}
            LoadingComponent={() => null}
            ErrorComponent={DisplayError}>
            {({ data }) => (
              <SettingsForm
                lastObtainedVersion={this.state.lastObtainedVersion}
                setLastObtainedVersion={this.setLastObtainedVersion}
                getVersionForKubectlBin={(bin: string) => system.kubectl.version({ bin })}
                initialValues={data}
                onSubmit={this.handleSubmit(system)}
              />
            )}
          </PromiseManager>
        )}
      </WithFMCSystem>
    )
  }
}
