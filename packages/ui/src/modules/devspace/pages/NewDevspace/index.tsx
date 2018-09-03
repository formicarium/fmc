import React from 'react'
import { Segment } from 'semantic-ui-react';
import { SegmentHeader } from '../../../common/components/SegmentHeader';
import { CreateDevspaceContainer } from '~/modules/devspace/containers/CreateDevspace';

export const NewDevspacePage: React.SFC = () => (
  <Segment>
    <SegmentHeader title='New devspace' icon='add' />
    <CreateDevspaceContainer />
  </Segment>
)
