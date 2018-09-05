import React, { Fragment, SyntheticEvent } from 'react'
import { Subscribe } from 'unstated';
import { SearchBar } from '../SearchBar';
import styled from 'styled-components';
import KeyHandler, {KEYPRESS, KEYDOWN} from 'react-key-handler';
import { DashboardState } from '../../state/DashboardState';
import { Container, Checkbox } from 'semantic-ui-react';
import { EventListContainer } from '../../containers/EventList';
import { EventListState } from '../../state/EventList';
import { DynamicGraph } from '../../containers/DynamicGraph';
import _ from 'lodash'
import { FilterForm } from '../FilterForm';
import { FilterContainer } from '../../containers/Filter';

const StyledSearchBar = styled(SearchBar)`
  margin-bottom: 20px;
`
const Wrapper = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
`

class DashboardInner extends React.Component<{dashboard: DashboardState}> {
  public componentDidMount() {
    this.props.dashboard.fetchGraph()
  }

  private handlePressArrowDown = (eventListState: EventListState) => (e: SyntheticEvent) => {
    if (!eventListState.state.showAll) {
      eventListState.increaseIndex()
      e.stopPropagation()
    }
  }

  private handlePressArrowUp = (eventListState: EventListState) => (e: SyntheticEvent) => {
    if (!eventListState.state.showAll) {
      eventListState.decreaseIndex()
      e.stopPropagation()
    }
  }

  private handlePressC = (eventListState: EventListState) => (e: SyntheticEvent) => {
    eventListState.toggleCumulative()
  }

  private handlePressA = (eventListState: EventListState) => (e: SyntheticEvent) => {
    eventListState.toggleShowAll()
  }

  public render() {
    const { dashboard } = this.props
    return (
      <Wrapper>
        <KeyHandler keyEventName={KEYPRESS} keyValue='f' onKeyHandle={dashboard.toggleShowFilter} />
        <Subscribe to={[EventListState]}>
          {(eventListState: EventListState) => (
            <Fragment>
              <KeyHandler keyEventName={KEYDOWN} keyValue='ArrowDown' onKeyHandle={this.handlePressArrowDown(eventListState)} />
              <KeyHandler keyEventName={KEYDOWN} keyValue='ArrowUp' onKeyHandle={this.handlePressArrowUp(eventListState)} />
              <KeyHandler keyEventName={KEYDOWN} keyValue='c' onKeyHandle={this.handlePressC(eventListState)} />
              <KeyHandler keyEventName={KEYDOWN} keyValue='a' onKeyHandle={this.handlePressA(eventListState)} />
            </Fragment>
          )}
        </Subscribe>

        {/* <SearchBar
          searchText={dashboard.state.searchText}
          onChangeSearchText={dashboard.setSearchText}
          loading={dashboard.state.loading}
          onSubmit={dashboard.toggleCardVisibility}
        /> */}

        <div style={{flexGrow: 1}}>
          <DynamicGraph />
        </div>

        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 300, display: 'flex', flexDirection: 'column' }}>
          <EventListContainer />
          <Container style={{backgroundColor: '#FFF', padding: 20}}>
            <Subscribe to={[EventListState]}>
              {(eventListState: EventListState) => (
                <Fragment>
                  <Checkbox
                    label='Cumulative'
                    style={{width: '100%', marginBottom: 20}}
                    checked={eventListState.state.cumulative || eventListState.state.showAll}
                    disabled={eventListState.state.showAll}
                    onChange={(__, { checked }) => {
                      eventListState.setCumulative(checked)
                    }}
                  />
                  <Checkbox
                    label='Show all'
                    style={{width: '100%'}}
                    checked={eventListState.state.showAll}
                    onChange={(__, { checked }) => {
                      eventListState.setShowAll(checked)
                    }}
                  />
                  <FilterContainer />
                </Fragment>
              )}
            </Subscribe>
          </Container>
        </div>
      </Wrapper>
    )
  }
}

export const Dashboard: React.SFC = () => (
  <Subscribe to={[DashboardState]}>
  {(dashboard: DashboardState) => (
    <DashboardInner dashboard={dashboard} />
  )}
  </Subscribe>
)
