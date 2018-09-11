import React from 'react'
import { Subscribe } from 'unstated';
import styled from 'styled-components';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import { DashboardState } from '../../state/DashboardState';
import { DynamicGraph } from '../../containers/DynamicGraph';
import _ from 'lodash'
import { FilterPalette } from '~/modules/tracing/components/FilterPalette';
import { Transition, Button } from 'semantic-ui-react';
import { HTTPGrid, requestOut, requestIn, responseOut, responseIn } from '~/modules/tracing/components/HTTP/HTTPGrid';
import { getHttpPanelRequestsAndResponses } from '~/modules/tracing/selectors/http';
import { WithMessages } from '~/modules/tracing/render-props/MessageList';

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
      <WithMessages>
        {({messages}) => (
          <Subscribe to={[DashboardState]}>
          {(dashboard: DashboardState) => (
            <Wrapper>
              <KeyHandler keyEventName={KEYPRESS} keyValue='f' onKeyHandle={dashboard.toggleShowFilter} />

              <div style={{flexGrow: 1}}>
                <DynamicGraph/>
              </div>
              <Transition visible={!!dashboard.state.selectedEdge || true} animation='fade' duration={500}>
                <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
                  {/* <div style={{display: 'flex', alignItems: 'flex-end'}}>
                    <Button icon='close' onClick={dashboard.deselectEdge} />
                  </div> */}
                  <HTTPGrid
                    clientRequest={requestOut}
                    clientResponse={responseOut}
                    serverRequest={requestIn}
                    serverResponse={responseIn}
                    // {...getHttpPanelRequestsAndResponses({
                    //   dashboardState: dashboard.state,
                    //   messages,
                    // })}
                  />
                </div>
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
