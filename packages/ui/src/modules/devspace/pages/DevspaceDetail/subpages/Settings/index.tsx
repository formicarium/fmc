import React from 'react'
import { Segment, Button, Icon, Header } from 'semantic-ui-react';

export const DevspaceSettingsPage: React.SFC = () => (
  <Segment style={{minHeight: 200}}>
    <Header color='red'>Danger Zone</Header>
    <Button
      color='red'
      onClick={() => alert('delete')}
    >
      <Icon name='trash' />
      Delete Devspace
    </Button>
  </Segment>
)
