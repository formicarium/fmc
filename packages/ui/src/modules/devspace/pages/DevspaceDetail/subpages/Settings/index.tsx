import React from 'react'
import { Segment, Header } from 'semantic-ui-react';
import { DevspaceSettingsContainer } from '~/modules/devspace/containers/DevspaceSettings';

export const DevspaceSettingsPage: React.SFC = () => (
  <Segment style={{minHeight: 200}}>
    <Header color='red'>Danger Zone</Header>
    <DevspaceSettingsContainer />
  </Segment>
)
