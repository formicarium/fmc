import React from 'react'
import { Subscribe } from 'unstated';
import styled from 'styled-components';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import { DashboardState } from '../../state/DashboardState';
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

export class Dashboard extends React.Component {
  public render() {
    return (
      <Subscribe to={[DashboardState]}>
      {(dashboard: DashboardState) => (
        <Wrapper>
          <KeyHandler keyEventName={KEYPRESS} keyValue='f' onKeyHandle={dashboard.toggleShowFilter} />

          <div style={{flexGrow: 1}}>
            <DynamicGraph />
          </div>

          {dashboard.state.showFilter && (
            <LateralMenuWrapper>
              <FilterPalette activeIndex={0} />
            </LateralMenuWrapper>
          )}
        </Wrapper>
      )}
      </Subscribe>
    )
  }
}
