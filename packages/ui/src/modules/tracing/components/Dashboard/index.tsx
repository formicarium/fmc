import React from 'react'
import { Subscribe } from 'unstated';
import styled from 'styled-components';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import { DashboardState } from '../../state/DashboardState';
import { DynamicGraph } from '../../containers/DynamicGraph';
import _ from 'lodash'
import { FilterPalette } from '~/modules/tracing/components/FilterPalette';
import { Transition, Button, Segment, Dimmer } from 'semantic-ui-react';
import { HTTPGrid } from '~/modules/tracing/components/HTTP/HTTPGrid';
import { getHttpPanelRequestsAndResponses } from '~/modules/tracing/selectors/http';
import { WithMessages } from '~/modules/tracing/render-props/MessageList';
import { KafkaGrid } from '~/modules/tracing/components/Kafka/KafkaGrid';
import { IEdge } from '~/modules/tracing/model/graph';
import { EventType } from '~/modules/tracing/model/event';
import { getKafkaGrid } from '~/modules/tracing/selectors/kafka';
// import { inProducer, outProducer, inConsumer, outConsumer } from '~/modules/tracing/mock/http';

const Wrapper = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
`

const LateralMenuWrapper = styled(Segment)`
  position: absolute !important;
  left: 0px;
  top: 0px;
  bottom: 0px;
  width: 600px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  background-color: #FFF;
`

const DetailModal = styled.div`
  z-index: 9999;
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

const isHttpEdge = (edge: IEdge | null) => edge && (edge.metadata.type === EventType.HTTP || edge.metadata.type === EventType.HTTP_OUT)
const isKafkaEdge = (edge: IEdge | null) => edge && (edge.metadata.type === EventType.KAFKA)
export class Dashboard extends React.Component {
  public render() {
    return (
      <WithMessages>
        {({messages}) => (
          <Subscribe to={[DashboardState]}>
          {(dashboard: DashboardState) => (
            <Wrapper>
              <KeyHandler keyEventName={KEYPRESS} keyValue='f' onKeyHandle={dashboard.toggleShowFilter} />
              <KeyHandler keyEventName={KEYPRESS} keyValue='d' onKeyHandle={dashboard.showDashboard} />

              <DynamicGraph/>
              <Transition visible={!!dashboard.state.selectedEdge} animation='fade' duration={500}>
                <DetailModal>
                  <CloseButton icon='close' onClick={dashboard.deselectEdge} />
                  {isHttpEdge(dashboard.state.selectedEdge) && (
                    <HTTPGrid
                    {...getHttpPanelRequestsAndResponses({
                      dashboardState: dashboard.state,
                      messages,
                    })}
                  />
                  )}
                  {isKafkaEdge(dashboard.state.selectedEdge) && (
                    <KafkaGrid
                      {...getKafkaGrid({
                        dashboardState: dashboard.state,
                        messages,
                      })}
                    />
                  )}
                </DetailModal>
              </Transition>

              <Dimmer active={!!dashboard.state.selectedEdge} page />
              <Transition visible={dashboard.state.showFilter && !dashboard.state.selectedEdge} animation='fade right' duration={500}>
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
