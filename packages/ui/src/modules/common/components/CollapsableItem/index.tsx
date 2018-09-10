import React from 'react'
import { SemanticICONS, Segment, Icon, Header } from 'semantic-ui-react';

export const CollapsableItem: React.SFC<{
  id: string,
  text?: string,
  iconName: SemanticICONS,
  open: boolean,
  onToggle: (id: string, open: boolean) => void,
  titleContent?: JSX.Element,
}> = ({
  id,
  text,
  open,
  iconName,
  children,
  onToggle,
  titleContent,
}) => (
  <div>
    <Segment secondary padded={true} style={{margin: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer'}} onClick={() => onToggle(id, !open)}>
        <div style={{flexGrow: 1, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {titleContent || (
            <>
              <Icon name={iconName} />
              <Header as='h4' style={{margin: 0, marginLeft: 10}}>{text}</Header>
            </>
          )}
        </div>

      <Icon name={open ? 'chevron up' : 'chevron down'} />
    </Segment>

    {open ? children : null}
  </div>

)
