import React from 'react'
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { ISystem } from '~/system';
import { ISettingsFormValue, SettingsForm } from '~/modules/settings/components/SettingsForm';
import { ToastService } from '~/modules/common/services/ToastService';
import { PromiseManager } from '~/modules/common/render-props/PromiseManager';
import { DisplayLoader } from '~/modules/common/components/DisplayLoader';
import { DisplayError } from '~/modules/common/components/DisplayError';

export interface ISettingsContainerState {
  initialValues: Partial<ISettingsFormValue>
}
export class SettingsContainer extends React.Component<{}, ISettingsContainerState> {
  public initialValues = {

  }
  private handleSubmit = (system: ISystem) => async (values: ISettingsFormValue) => {
    try {
      await system.jsonStorage.set('kubectlBin', values.kubectlBin)

      ToastService.toastSuccess('📝 Settings saved!')
    } catch (err) {
      ToastService.toastSuccess(`Failed to save! ${err.toString()}`)
    }
  }

  private loadInitialValues = (system: ISystem) =>
    (): Promise<Partial<ISettingsFormValue>> =>
      system.jsonStorage.get<string>('kubectlBin').then((kubectlBin) => ({ kubectlBin }))

  public render() {
    return (
      <WithFMCSystem>
        {(system) => (
          <PromiseManager
            promise={this.loadInitialValues(system)}
            LoadingComponent={DisplayLoader}
            ErrorComponent={DisplayError}>
            {({ data }) => (
              <SettingsForm
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
