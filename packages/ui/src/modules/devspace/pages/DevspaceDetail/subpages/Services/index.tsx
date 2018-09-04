import React from 'react'
import { DevspaceServices } from '~/modules/devspace/containers/DevspaceServices';
import { ApplicatLogs } from '~/modules/application/containers/ApplicationLogs';

export const DevspaceServicesPage: React.SFC = () => (
  <div>
    <ApplicatLogs namespace={'sasa'} applicationName='purgatory'/>
    {/* <DevspaceServices /> */}
  </div>
)
