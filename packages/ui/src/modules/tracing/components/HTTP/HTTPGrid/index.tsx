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
export class HTTPGrid extends React.Component<IHTTPGridProps> {
  public render() {
    const {
      outProducer,
      inConsumer,
      inProducer,
      outConsumer,
    } = this.props
    return (
      <div style={{width: '100%', height: '100%', padding: 10, backgroundColor: '#f7f7f7', display: 'grid', gridColumnGap: 10, gridRowGap: 10, gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr'}}>
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
      </div>
    )
  }
}
