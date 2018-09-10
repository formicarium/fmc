import React from 'react'
import { Header, Segment } from 'semantic-ui-react';
import { ObjectInspector } from 'react-inspector';

export interface IResponseProps {
  status: number
  service: string,
  headers: object
  body: object
}

export const HTTPResponse: React.SFC<IResponseProps> = ({
  status,
  service,
  headers,
  body,
}) => (
  <div style={{padding: 14}}>
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
