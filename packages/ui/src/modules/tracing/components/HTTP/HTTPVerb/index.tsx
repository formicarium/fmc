import React from 'react'
import { colorForVerb } from '~/modules/tracing/components/HTTP/logic';
import { HTTPVerb } from '~/modules/tracing/components/HTTP/Request';

export const DisplayHTTPVerb: React.SFC<{
  verb: HTTPVerb,
}> = ({
  verb,
}) => (
  <span style={{fontWeight: 'bold', color: '#FFF', backgroundColor: colorForVerb[verb], padding: '2 8 2 8', borderRadius: 4}}>
    {verb}
  </span>
)
