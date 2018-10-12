import React from 'react'
import { Segment, Divider } from 'semantic-ui-react';
import { ObjectInspector } from 'react-inspector';
import { HTTPVerb } from '~/modules/tracing/components/HTTP/HTTPVerb';
import { EventType, Direction } from '~/modules/tracing/model/event';
import { Row } from '~/modules/common/components/Row';
import { Header } from '~/modules/common/Header';
import { DisplayEventType } from '~/modules/common/components/DisplayEventType';
import { DisplayTimestamp } from '~/modules/common/components/DisplayTimestamp';
import { DisplayEndpoint } from '~/modules/tracing/components/HTTP/DisplayEndpoint';
import { FadedText } from '~/modules/common/components/FadedText';
import { isRequest, isResponse } from '~/modules/tracing/components/HTTP/logic';
import { DisplayHTTPStatus } from '~/modules/tracing/components/HTTP/HTTPStatus';
import { SpanType, SpanDirection } from '~/modules/tracing/graphql/queries/events';

export interface IRequestProps {
  spanId: string,
  eventType: SpanType,
  direction: SpanDirection,
  status?: number,
  verb: HTTPVerb,
  service: string,
  peerService: string
  endpoint: string
  headers: object,
  body: object
  timestamp: number
}

const ARROW_RIGHT = '→'
const ARROW_LEFT = '←'

export const HTTPRequest: React.SFC<IRequestProps> = ({
  spanId,
  eventType,
  direction,
  verb,
  service,
  peerService,
  endpoint,
  headers,
  body,
  timestamp,
  status,
}) => (
  <div style={{padding: 14}}>
    <Row spaceBetween centerVertical>
      <Header as='h3' noMargin>
        <DisplayEventType eventType={eventType} style={{marginRight: 20}} />
        <span style={{fontFamily: 'Courier New', marginRight: 10}}>[{spanId}]</span>
        <FadedText faded={eventType === EventType.HTTP}>{eventType === EventType.HTTP_OUT ? service : peerService}</FadedText>
        <FadedText faded> {isResponse(eventType, direction) ? ARROW_LEFT : ARROW_RIGHT} </FadedText>
        <FadedText faded={eventType === EventType.HTTP_OUT}>{eventType === EventType.HTTP ? service : peerService}</FadedText>
      </Header>
      <DisplayTimestamp timestamp={timestamp} />
    </Row>
    <Divider />

    {isRequest(eventType, direction) && (
    <DisplayEndpoint
      endpoint={endpoint}
      verb={verb}
    />
    )}
    {(status && isResponse(eventType, direction)) && (
      <Segment tertiary style={{fontFamily: 'Courier new'}}>
        <DisplayHTTPStatus
          status={status}
          style={{marginRight: 20}}
        />
      </Segment>
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
