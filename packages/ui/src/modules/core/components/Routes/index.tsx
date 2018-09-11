import React from 'react'
import { DevspacesPage } from '~/modules/devspace/pages/Devspaces';
import { DevspaceDetailPage } from '~/modules/devspace/pages/DevspaceDetail';
import { NewDevspacePage } from '~/modules/devspace/pages/NewDevspace';
import { Switch, Route } from 'react-router';
import { Dashboard } from '~/modules/tracing/components/Dashboard';
import { SyncDashboard } from '~/modules/sync/components/SyncDashboard';

export const Routes: React.SFC = () => (
  <Switch>
    <Route path='/' exact component={DevspacesPage}/>
    <Route path='/devspaces/create' component={NewDevspacePage}/>
    <Route path='/my-devspace' component={DevspaceDetailPage}/>
    <Route path='/tracing' component={Dashboard}/>
    <Route path='/sync' component={SyncDashboard}/>
  </Switch>
)
