import React from 'react'
import { Button, Icon, Segment, Loader, Dimmer } from 'semantic-ui-react';
import { DevspaceList } from '../../components/DevspaceList';
import styled from 'styled-components';
import { SegmentHeader } from '../../../common/components/SegmentHeader';
import { PromiseManager, IErrorComponentProps } from '~/modules/common/render-props/PromiseManager';
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { sleep, devspaceToDevspaceConfig } from 'common'

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const DisplayError: React.SFC<IErrorComponentProps> = ({
  error,
  retry,
}) => (
  <div>
    {error.toString()}
    <Button
      onClick={retry}
    >
      Tentar novamente
    </Button>
  </div>
)

const DisplayLoader: React.SFC = () => (
  <Dimmer page active>
    <Loader indeterminate>Loading...</Loader>
  </Dimmer>
)

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
          promise={() => system.soilService.getDevspaces()}
          LoadingComponent={DisplayLoader}
          ErrorComponent={DisplayError}>
          {(promiseState) => (
            <DevspaceList
              devspaces={promiseState.data}
              onDeleteDevspace={() => {
                // impl
              }}
              onUseDevspace={async (devspace) => {
                const devspaceConfig = devspaceToDevspaceConfig(devspace)
                await system.configService.setDevspaceConfig(devspaceConfig)
              }}
            />
          )}
        </PromiseManager>
      )}
    </WithFMCSystem>
  </Segment>
)
