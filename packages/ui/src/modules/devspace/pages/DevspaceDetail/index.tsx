import React from 'react'
import styled from 'styled-components';
import { SideMenu } from '../../components/SideMenu';
import { Switch, Route, RouteComponentProps } from 'react-router';
import { DevspaceInfraPage } from './subpages/Infra';
import { DevspaceServicesPage } from './subpages/Services';
import { DevspaceSettingsPage } from './subpages/Settings';
import { DeployServicePage } from './subpages/DeployService';

const Wrapper = styled.div`

`
const Row = styled.div`
  display: flex;
  flex-direction: row;
`
export const DevspaceDetailPage: React.SFC<RouteComponentProps<{}>> = () => (
  <Wrapper>
    <Row>
      <div>
        <SideMenu />
      </div>
      <div style={{flexGrow: 1, paddingLeft: 20, width: 0}}>
        <Switch>
          <Route path='/my-devspace/' exact component={DevspaceInfraPage}/>
          <Route path='/my-devspace/services' exact component={DevspaceServicesPage}/>
          <Route path='/my-devspace/settings' exact component={DevspaceSettingsPage}/>
          <Route path='/my-devspace/services/deploy' exact component={DeployServicePage}/>
        </Switch>
      </div>
    </Row>
  </Wrapper>
)
