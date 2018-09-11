import React, { Fragment } from 'react'
import { Segment } from 'semantic-ui-react';
import { SegmentHeader } from '~/modules/common/components/SegmentHeader';
import { CreateDevspaceContainer } from '~/modules/devspace/containers/CreateDevspace';
import { DisplaySetupContainer } from '~/modules/devspace/containers/DisplaySetup';

export const NewDevspacePage: React.SFC = () => (
  <Fragment>
    <Segment>
      <SegmentHeader title='New devspace' icon='add' />
      <CreateDevspaceContainer />
    </Segment>
    <Segment>
      <SegmentHeader title='Current setup config' icon='cog' />
      <DisplaySetupContainer />
    </Segment>
  </Fragment>

)
