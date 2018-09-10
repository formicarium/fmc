import React, { Fragment, SyntheticEvent } from 'react'
import { Subscribe } from 'unstated';
import styled from 'styled-components';
import KeyHandler, {KEYPRESS, KEYDOWN} from 'react-key-handler';
import { DashboardState } from '../../state/DashboardState';
import { EventListState } from '../../state/EventList';
import { DynamicGraph } from '../../containers/DynamicGraph';
import _ from 'lodash'
import { FilterPalette } from '~/modules/tracing/components/FilterPalette';

const Wrapper = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
`

const LateralMenuWrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  width: 600px;
  display: flex;
  flex-direction: column;
  background-color: #FFF;
`
const LateralMenuBottomAreaWrapper = styled.div`
  padding: 20px;
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

        <div style={{flexGrow: 1}}>
          <DynamicGraph />
        </div>

        <LateralMenuWrapper>
          <FilterPalette activeIndex={0} />
          {/* <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{padding: 20}}>
            <SpanExplorer />
            </div>
            <div style={{minHeight: 400}}>
              <EventListContainer />
            </div>

          </div> */}

          {/* <LateralMenuBottomAreaWrapper>
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

                </Fragment>
              )}
            </Subscribe>
          </LateralMenuBottomAreaWrapper> */}
        </LateralMenuWrapper>
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
