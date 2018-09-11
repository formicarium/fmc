import React from 'react'
import moment from 'moment';

export const DisplayTimestamp: React.SFC<{
  timestamp: number
}> = ({
  timestamp
}) => (
  <div style={{textAlign: 'right', fontStyle: 'italic'}}>
    {moment(timestamp).format('DD/MM/YYYY HH:mm:ss')}
  </div>
)
