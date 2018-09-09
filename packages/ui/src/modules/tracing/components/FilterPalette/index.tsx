import React from 'react'
import { Accordion, Menu, Header, Divider } from 'semantic-ui-react';
import { SpanExplorerContainer } from '~/modules/tracing/containers/SpanExplorer';
import { FilterContainer } from '~/modules/tracing/containers/Filter';
import { EventListContainer } from '~/modules/tracing/containers/EventList';

export interface IFilterPaletteProps {
  activeIndex: number
}

// export const FilterPalette: React.SFC<IFilterPaletteProps> = ({
//   activeIndex,
// }) => (
//   <Accordion as={Menu} vertical fluid>
//       <Menu.Item>
//       <Accordion.Title
//         active={true}
//         content='Events'
//         index={1}
//         onClick={this.handleClick}
//       />
//       <Accordion.Content active={true} content={<EventListContainer />} style={{padding: 0}} />
//     </Menu.Item>

//     <Menu.Item>
//       <Accordion.Title
//         active={true}
//         content='Spans'
//         index={0}
//         onClick={this.handleClick}
//       />
//       <Accordion.Content active={true} content={<SpanExplorerContainer />} />
//     </Menu.Item>

//     <Menu.Item>
//       <Accordion.Title
//         active={true}
//         content='Filters'
//         index={1}
//         onClick={this.handleClick}
//       />
//       <Accordion.Content active={true} content={<FilterContainer />} />
//     </Menu.Item>
//   </Accordion>
// )

export const FilterPalette: React.SFC<IFilterPaletteProps> = ({
  activeIndex,
}) => (
  <div style={{height: '100%', overflowX: 'hidden', overflowY: 'auto'}}>
    <Header as='h2'>Spans</Header>
    <SpanExplorerContainer />
    <Divider />
    <Header as='h2'>Events</Header>
    <EventListContainer />
    <Divider />
    <Header as='h2'>Filters</Header>
    <FilterContainer />
  </div>
)
