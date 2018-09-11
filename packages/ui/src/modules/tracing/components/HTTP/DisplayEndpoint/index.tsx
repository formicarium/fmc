import React from 'react'
import { DisplayHTTPVerb, HTTPVerb } from '~/modules/tracing/components/HTTP/HTTPVerb';
import { Segment } from 'semantic-ui-react';

export const DisplayEndpoint: React.SFC<{
  endpoint: string,
  verb: HTTPVerb,
}> = ({
  endpoint,
  verb
}) => (
  <Segment tertiary style={{fontFamily: 'Courier New'}}>
    <DisplayHTTPVerb verb={verb} />
    <b style={{marginLeft: 20 }}>{endpoint}</b>
  </Segment>
)
