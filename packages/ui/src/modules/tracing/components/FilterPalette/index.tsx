import React from 'react'
import { SpanExplorerContainer } from '~/modules/tracing/containers/SpanExplorer';
import { FilterContainer } from '~/modules/tracing/containers/Filter';
import { EventListContainer } from '~/modules/tracing/containers/EventList';
import { Subscribe } from 'unstated';
import { DashboardState } from '~/modules/tracing/state/DashboardState';
import { CollapsableItem } from '~/modules/common/components/CollapsableItem';

export interface IFilterPaletteProps {
  activeIndex: number
}

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
