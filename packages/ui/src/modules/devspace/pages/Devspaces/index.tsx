import React from 'react'
import { Button, Icon, Segment } from 'semantic-ui-react';
import { DevspaceList } from '../../components/DevspaceList';
import styled from 'styled-components';
import { SegmentHeader } from '../../../common/components/SegmentHeader';
import { PromiseManager } from '~/modules/common/render-props/PromiseManager';
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { devspaceToDevspaceConfig } from 'common'
import { toast, ToastType } from 'react-toastify';
import { DisplayLoader } from '~/modules/common/components/DisplayLoader';
import { DisplayError } from '~/modules/common/components/DisplayError';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const DevspacesPage: React.SFC = () => (
  <Segment>
    <SegmentHeader title='Devspaces' icon='list' />

    <ButtonWrapper>
      <Button color='green'>
        <Icon name='add circle' />
        New devspace
      </Button>
    </ButtonWrapper>

    <WithFMCSystem>
      {(system) => (
        <PromiseManager
          promise={() => Promise.all([system.soilService.getDevspaces(), system.configService.readConfig()])}
          LoadingComponent={DisplayLoader}
          ErrorComponent={DisplayError}>
          {({ data: [devspaces, config]}, refetch, patchData) => (
            <DevspaceList
              devspaces={devspaces}
              selectedDevspaceName={config.devspace.name}
              onDeleteDevspace={async (devspace) => {
                try {
                  await system.soilService.deleteDevspace(devspace.name)
                  toast('Success', {
                    type: 'success' as ToastType,
                  })
                  patchData([
                    devspaces.filter((dev) => dev.name !== devspace.name),
                    config,
                  ])
                } catch (err) {
                  toast('Error', {
                    type: 'error' as ToastType,
                  })
                }
              }}
              onUseDevspace={async (devspace) => {
                const devspaceConfig = devspaceToDevspaceConfig(devspace)
                try {
                  await system.configService.setDevspaceConfig(devspaceConfig)
                  patchData([
                    devspaces,
                    {
                      ...config,
                      devspace: {
                        ...config.devspace,
                        name: devspace.name,
                      },
                    },
                  ])
                } catch (err) {
                  toast('Error', {
                    type: 'error' as ToastType,
                  })
                }
              }}
            />
          )}
        </PromiseManager>
      )}
    </WithFMCSystem>
  </Segment>
)
