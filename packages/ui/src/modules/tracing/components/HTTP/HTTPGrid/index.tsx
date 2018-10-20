import React from 'react'
import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';
import { HTTPRequest, IRequestProps } from '~/modules/tracing/components/HTTP/Request';

export const DraggablePanel = styled.div`
  background-color: #FFF;
  margin: 0px !important;
  overflow: hidden;
`

export interface IHTTPGridProps {
  outProducer: IRequestProps,
  inConsumer: IRequestProps,
  inProducer: IRequestProps
  outConsumer: IRequestProps
}

const Grid = styled.div`
  padding: 0 10 10 10;
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`
export class HTTPGrid extends React.Component<IHTTPGridProps> {
  public render() {
    const {
      outProducer,
      inConsumer,
      inProducer,
      outConsumer,
    } = this.props

    console.log(this.props)
    return (
      <Grid>
        {/* x:0 y: 0 */}
        <Segment style={{margin: 0, backgroundColor: '#FFF'}}>
          <HTTPRequest
            {...outProducer}
          />
        </Segment>

        {/* x:1 y: 0 */}
        <Segment style={{margin: 0, backgroundColor: '#FFF'}}>
          <HTTPRequest
            {...inConsumer}
          />
        </Segment>

        {/* x:1 y: 0 */}
        <Segment style={{margin: 0, backgroundColor: '#FFF'}}>
          <HTTPRequest
            {...outConsumer}
          />
        </Segment>

        {/* x:1 y: 1 */}
        <Segment style={{margin: 0, backgroundColor: '#FFF'}}>
          <HTTPRequest
            {...inProducer}
          />
        </Segment>
      </Grid>
    )
  }
}
