import React from 'react'
import { Header, Segment } from 'semantic-ui-react';

export interface IPanelProps {
  title?: string
}
export const Panel: React.SFC<IPanelProps> = ({ title, children }) => (
  <Segment>
    {title && (
      <Header as='h3' dividing color='teal'>
        {title}
      </Header>
    )}
    {children}
  </Segment>
)
