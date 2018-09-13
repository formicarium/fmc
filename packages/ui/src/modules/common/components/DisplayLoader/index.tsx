import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';

export const DisplayLoader: React.SFC = () => (
  <Dimmer page active>
    <Loader indeterminate>Loading...</Loader>
  </Dimmer>
)

export const DisplayLocalizedLoader: React.SFC = () => (
  <Dimmer inverted active>
    <Loader indeterminate>Loading...</Loader>
  </Dimmer>
)
