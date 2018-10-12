import React, { CSSProperties } from 'react'
import { SpanType } from '~/modules/tracing/graphql/queries/events';

const colorForEventType = {
  [SpanType.httpIn]: '#3498db', // blue
  [SpanType.httpOut]: '#c0392b', // sun flower
  [SpanType.kafka]: '#2980b9' // pomegranate
}

const formatEventTypeLabel = (eventType: SpanType) => eventType && eventType.toLowerCase().replace('_', ' ')

export const DisplayEventType: React.SFC<{
  eventType: SpanType,
  style?: CSSProperties
}> = ({
  eventType,
  style
}) => (
  <span style={{...style, fontWeight: 'bold', color: '#FFF', fontFamily: 'Courier New', backgroundColor: colorForEventType[eventType], padding: '2 8 2 8', borderRadius: 4}}>
    {eventType}
  </span>
)
