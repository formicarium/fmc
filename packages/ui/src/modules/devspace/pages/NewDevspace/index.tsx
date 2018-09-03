import React from 'react'
import { Segment, Icon } from 'semantic-ui-react';
import { CreateDevspaceForm } from '../../components/CreateDevspaceForm';
import { SegmentHeader } from '../../../common/components/SegmentHeader';

export const NewDevspacePage: React.SFC = () => (
  <Segment>
    <SegmentHeader title='New devspace' icon='add' />
    <CreateDevspaceForm />
  </Segment>
)
