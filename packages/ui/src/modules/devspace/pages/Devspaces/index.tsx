import React from 'react'
import { Button, Icon, Segment } from 'semantic-ui-react';
import { DevspaceList } from '../../components/DevspaceList';
import styled from 'styled-components';
import { SegmentHeader } from '../../../common/components/SegmentHeader';

const DEVSPACES = [{
  name: 'devspcae 1',
}, {
  name: 'devspcae 2',
}]

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

    <DevspaceList
      devspaces={DEVSPACES}
      onDeleteDevspace={() => {
        // impl
      }}
      onUseDevspace={() => {
        // impl
      }}
    />
  </Segment>
)
