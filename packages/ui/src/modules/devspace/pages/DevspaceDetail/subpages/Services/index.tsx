import React from 'react'
import { IApplication, ApplicationsList } from '../../../../../application/components/ApplicationsList';

const APPLICATIONS: IApplication[] = [{
  id: 'my-app',
  name: 'my app',
  interfaces: [{
    name: 'interface 1',
    link: 'http://int1',
  }, {
    name: 'interface 2',
    link: 'http://int2',
  }, {
    name: 'interface 3',
    link: 'http://int3',
  }],
}, {
  id: 'my-app 2',
  name: 'my app 2',
  interfaces: [{
    name: 'interface 1',
    link: 'http://int1',
  }, {
    name: 'interface 2',
    link: 'http://int2',
  }, {
    name: 'interface 3',
    link: 'http://int3',
  }],
}]
export const DevspaceServicesPage: React.SFC = () => (
  <div>
    <ApplicationsList
      applications={APPLICATIONS}
    />
  </div>
)
