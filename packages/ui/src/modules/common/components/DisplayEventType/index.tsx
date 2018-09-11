import React, { CSSProperties } from 'react'
import { EventType } from '~/modules/tracing/model/event';

const colorForEventType = {
  [EventType.HTTP]: 'purple',
  [EventType.HTTP_OUT]: 'tomato',
  [EventType.KAFKA]: 'red'
}

export const DisplayEventType: React.SFC<{
  eventType: EventType,
  style?: CSSProperties
}> = ({
  eventType,
  style
}) => (
  <span style={{...style, fontWeight: 'bold', color: '#FFF', fontFamily: 'Courier New', backgroundColor: colorForEventType[eventType], padding: '2 8 2 8', borderRadius: 4}}>
    {eventType && eventType.toLowerCase().replace('_', ' ')}
  </span>
)
