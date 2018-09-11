import React from 'react'
import { Subscribe } from 'unstated';
import styled from 'styled-components';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import { DashboardState } from '../../state/DashboardState';
import { DynamicGraph } from '../../containers/DynamicGraph';
import _ from 'lodash'
import { FilterPalette } from '~/modules/tracing/components/FilterPalette';
import { Transition, Button } from 'semantic-ui-react';
import { HTTPGrid } from '~/modules/tracing/components/HTTP/HTTPGrid';
import { getHttpPanelRequestsAndResponses } from '~/modules/tracing/selectors/http';
import { WithMessages } from '~/modules/tracing/render-props/MessageList';
// import { inProducer, outProducer, inConsumer, outConsumer } from '~/modules/tracing/mock/http';

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

const DetailModal = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
`

const CloseButton = styled(Button)`
  position: absolute;
  right: 10px;
  top: -44px;
  z-index: 999;
  margin: 0px;
`
export class Dashboard extends React.Component {
  public render() {
    return (
      <WithMessages>
        {({messages}) => (
          <Subscribe to={[DashboardState]}>
          {(dashboard: DashboardState) => (
            <Wrapper>
              <KeyHandler keyEventName={KEYPRESS} keyValue='f' onKeyHandle={dashboard.toggleShowFilter} />
              <KeyHandler keyEventName={KEYPRESS} keyValue='d' onKeyHandle={() => {
                if (dashboard.state.showFilter) {
                  dashboard.toggleShowFilter()
                }
                if (dashboard.state.selectedEdge) {
                  dashboard.deselectEdge()
                }
              }} />

              <DynamicGraph/>
              <Transition visible={!!dashboard.state.selectedEdge} animation='fade' duration={500}>
                <DetailModal>
                  <CloseButton icon='close' onClick={dashboard.deselectEdge} />
                  <HTTPGrid
                    {...getHttpPanelRequestsAndResponses({
                      dashboardState: dashboard.state,
                      messages,
                    })}
                  />
                </DetailModal>
              </Transition>

              <Transition visible={dashboard.state.showFilter} animation='fade right' duration={500}>
                <LateralMenuWrapper>
                  <FilterPalette activeIndex={0} />
                </LateralMenuWrapper>
              </Transition>
            </Wrapper>
          )}
          </Subscribe>
        )}
      </WithMessages>
    )
  }
}
