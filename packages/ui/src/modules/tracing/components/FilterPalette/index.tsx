import React from 'react'
import { Header, Segment, Icon, SemanticICONS } from 'semantic-ui-react';
import { SpanExplorerContainer } from '~/modules/tracing/containers/SpanExplorer';
import { FilterContainer } from '~/modules/tracing/containers/Filter';
import { EventListContainer } from '~/modules/tracing/containers/EventList';
import { Subscribe } from 'unstated';
import { DashboardState } from '~/modules/tracing/state/DashboardState';

export interface IFilterPaletteProps {
  activeIndex: number
}

const CollapsableItem: React.SFC<{
  id: string,
  text: string,
  iconName: SemanticICONS,
  open: boolean,
  onToggle: (id: string, open: boolean) => void,
}> = ({
  id,
  text,
  open,
  iconName,
  children,
  onToggle,
}) => (
  <div>
    <Segment secondary padded={true} style={{margin: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer'}} onClick={() => onToggle(id, !open)}>
      <div style={{flexGrow: 1, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Icon name={iconName} />
        <Header as='h2' style={{margin: 0, marginLeft: 10}}>{text}</Header>
      </div>

      <Icon name={open ? 'chevron up' : 'chevron down'} />
    </Segment>

    {open ? children : null}
  </div>

)
export const FilterPalette: React.SFC<IFilterPaletteProps> = ({
  activeIndex,
}) => (
  <Subscribe to={[DashboardState]}>
    {(dashboard: DashboardState) => (
      <div style={{height: '100%', overflowX: 'hidden', overflowY: 'auto'}}>
        <CollapsableItem
          id='filter'
          text='Filter'
          iconName='filter'
          open={dashboard.state.expandedSections.filter}
          onToggle={dashboard.setExpandedSection}>
          <FilterContainer />
        </CollapsableItem>
        <CollapsableItem
          id='spanExplorer'
          text='Span Explorer'
          iconName='search'
          open={dashboard.state.expandedSections.spanExplorer}
          onToggle={dashboard.setExpandedSection}>
          <SpanExplorerContainer />
        </CollapsableItem>
        <CollapsableItem
          id='eventList'
          text='Event List'
          iconName='list'
          open={dashboard.state.expandedSections.eventList}
          onToggle={dashboard.setExpandedSection}>
          <EventListContainer />
        </CollapsableItem>
      </div>
    )}
  </Subscribe>

)
