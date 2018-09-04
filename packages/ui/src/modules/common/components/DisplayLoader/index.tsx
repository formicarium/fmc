import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';

export const DisplayLoader: React.SFC = () => (
  <Dimmer page active>
    <Loader indeterminate>Loading...</Loader>
  </Dimmer>
)
