import React, { CSSProperties } from 'react'
import { Header as SemanticHeader, Segment, HeaderProps, Divider } from 'semantic-ui-react';
import { ObjectInspector } from 'react-inspector';
import { DisplayHTTPVerb, HTTPVerb } from '~/modules/tracing/components/HTTP/HTTPVerb';
import moment from 'moment';
import { EventType } from '~/modules/tracing/model/event';

export interface IRequestProps {
  eventType: EventType,
  verb: HTTPVerb,
  service: string,
  targetService: string
  endpoint: string
  headers: object,
  body: object
  timestamp: number
}

const Row: React.SFC<{spaceBetween: boolean, centerVertical: boolean}> = ({
  children,
  spaceBetween,
  centerVertical,
}) => (
  <div style={{display: 'flex', flexDirection: 'row', alignItems: centerVertical ? 'center' : 'inherit', justifyContent: spaceBetween ? 'space-between' : 'inherit'}}>
    {children}
  </div>
)

const DisplayTimestamp: React.SFC<{
  timestamp: number
}> = ({
  timestamp
}) => (
  <div style={{textAlign: 'right', fontStyle: 'italic'}}>
    {moment(timestamp).format('DD/MM/YYYY HH:mm:ss')}
  </div>
)

const Header: React.SFC<HeaderProps & {noMargin?: boolean}> = ({
  noMargin,
  style,
  ...props
}) => (
  <SemanticHeader {...props} style={{...style, margin: noMargin ? 0 : 'inherit'}}/>
)

const DisplayEndpoint: React.SFC<{
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

const colorForEventType = {
  [EventType.HTTP]: 'purple',
  [EventType.HTTP_OUT]: 'tomato',
  [EventType.KAFKA]: 'red'
}

const DisplayEventType: React.SFC<{
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

const FadedText: React.SFC<{faded?: boolean}> = ({
children,
faded,
}) => (
  <span style={{color: faded ? '#ccc' : 'inherit'}}>
    {children}
  </span>
)
export const HTTPRequest: React.SFC<IRequestProps> = ({
  eventType,
  verb,
  service,
  targetService,
  endpoint,
  headers,
  body,
  timestamp,
}) => (
  <div style={{padding: 14}}>
    <Row spaceBetween centerVertical>
      <Header as='h3' noMargin>
        <DisplayEventType eventType={eventType} style={{marginRight: 20}} />
        <FadedText faded={eventType === EventType.HTTP}>{service}</FadedText>
        <FadedText faded> → </FadedText>
        <FadedText faded={eventType === EventType.HTTP_OUT}>{targetService}</FadedText>
      </Header>
      <DisplayTimestamp timestamp={timestamp} />
    </Row>
    <Divider />

    {eventType === EventType.HTTP_OUT && (
    <DisplayEndpoint
      endpoint={endpoint}
      verb={verb}
    />
    )}

    <Header as='h5'>Headers</Header>
    <Segment secondary style={{backgroundColor: '#FFF'}}>
      <ObjectInspector
        data={headers}
        expandLevel={10}
      />
    </Segment>
    <Header as='h5'>Body</Header>
    <Segment secondary style={{backgroundColor: '#FFF'}}>
      <ObjectInspector
        data={body}
        expandLevel={10}
      />
    </Segment>
  </div>
)
