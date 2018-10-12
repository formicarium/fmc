import React from 'react'
import { Segment, Divider } from 'semantic-ui-react';
import { ObjectInspector } from 'react-inspector';
import { Row } from '~/modules/common/components/Row';
import { Header } from '~/modules/common/Header';
import { DisplayTimestamp } from '~/modules/common/components/DisplayTimestamp';
import { FadedText } from '~/modules/common/components/FadedText';
import { SpanDirection } from '~/modules/tracing/graphql/queries/events';

export interface IKafkaEventProps {
  spanId: string,
  direction: SpanDirection,
  service: string,
  peerService: string,
  topic: string
  data: object
  timestamp: number
}

const ARROW_RIGHT = '→'

export const KafkaEvent: React.SFC<IKafkaEventProps> = ({
  spanId,
  direction,
  service,
  peerService,
  topic,
  data,
  timestamp,
}) => (
  <div style={{padding: 14}}>
    <Row spaceBetween centerVertical>
      <Header as='h3' noMargin>
        <span style={{fontFamily: 'Courier New', marginRight: 10}}>[{spanId}]</span>
        <FadedText faded={direction === SpanDirection.consumer}>{direction === SpanDirection.producer ? service : peerService}</FadedText>
        <FadedText faded> {ARROW_RIGHT} </FadedText>
        <FadedText faded={direction === SpanDirection.producer}>{direction === SpanDirection.producer ? peerService : service}</FadedText>
      </Header>
      <DisplayTimestamp timestamp={timestamp} />
    </Row>
    <Divider />

    <Segment tertiary style={{fontFamily: 'Courier New'}}>
      TOPIC <b>{topic}</b>
    </Segment>

    <Header as='h5'>Data</Header>
    <Segment secondary style={{backgroundColor: '#FFF'}}>
      <ObjectInspector
        data={data}
        expandLevel={10}
      />
    </Segment>
  </div>
)
