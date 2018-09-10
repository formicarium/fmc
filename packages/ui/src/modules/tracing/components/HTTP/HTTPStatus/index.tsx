import React from 'react'
import { statusColorTable, getFirstDigit } from '~/modules/tracing/components/HTTP/logic';

export const DisplayHTTPStatus: React.SFC<{
  status: number,
}> = ({
  status,
}) => (
  <span style={{fontWeight: 'bold', color: '#FFF', backgroundColor: statusColorTable[getFirstDigit(status)], padding: '2 8 2 8', borderRadius: 4}}>
    {status}
  </span>
)
