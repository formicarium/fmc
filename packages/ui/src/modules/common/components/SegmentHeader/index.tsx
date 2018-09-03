import React, { Fragment } from 'react'
import { Header, Icon, Divider, SemanticICONS } from 'semantic-ui-react';

export interface ISegmentHeaderProps {
  title: string
  icon: SemanticICONS
}
export const SegmentHeader: React.SFC<ISegmentHeaderProps> = ({
  title,
  icon,
}) => (
  <Fragment>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <Icon name={icon} size='small' />
      <Header as='h5' style={{margin: 0}}>{title}</Header>
    </div>
    <Divider style={{marginLeft: -14, marginRight: -14}} />
  </Fragment>
)
