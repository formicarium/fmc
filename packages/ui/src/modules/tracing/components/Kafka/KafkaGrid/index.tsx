import React from 'react'
import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';
import { KafkaEvent, IKafkaEventProps } from '~/modules/tracing/components/Kafka/KafkaEvent';

export const DraggablePanel = styled.div`
  background-color: #FFF;
  margin: 0px !important;
  overflow: hidden;
`

export interface IHTTPGridProps {
  producer: IKafkaEventProps,
  consumer: IKafkaEventProps,
}

const Grid = styled.div`
  padding: 0 10 10 10;
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`
export class KafkaGrid extends React.Component<IHTTPGridProps> {
  public render() {
    const {
      producer,
      consumer,
    } = this.props
    return (
      <Grid>
        {/* x:0 y: 0 */}
        <Segment style={{margin: 0, backgroundColor: '#FFF'}}>
          <KafkaEvent
            {...producer}
          />
        </Segment>

        {/* x:1 y: 0 */}
        <Segment style={{margin: 0, backgroundColor: '#FFF'}}>
          <KafkaEvent
            {...consumer}
          />
        </Segment>
      </Grid>
    )
  }
}
