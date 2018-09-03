import React from 'react'
import { IApplication, ApplicationsList } from '../../../../../application/components/ApplicationsList';

const APPLICATIONS: IApplication[] = [{
  id: 'tanajura',
  name: 'Tanajura',
  interfaces: [{
    name: 'interface 1',
    link: 'http://int1',
  }],
}, {
  id: 'hive',
  name: 'Hive',
  interfaces: [{
    name: 'interface 1',
    link: 'http://int1',
  }, {
    name: 'interface 2',
    link: 'http://int2',
  }],
}]
export const DevspaceInformationPage: React.SFC = () => (
  <div>
    <ApplicationsList
      applications={APPLICATIONS}
    />
  </div>
)
