import React from 'react'
import { Header, Segment } from 'semantic-ui-react';
import { ObjectInspector } from 'react-inspector';

export enum HTTPVerb {
  POST = 'POST',
  GET = 'GET',
  HEAD = 'HEAD',
  DELETE = 'DELETE',
}

export interface IRequestProps {
  verb: HTTPVerb
  service: string,
  targetService: string
  endpoint: string
  headers: object,
  body: object
  timestamp: number
}

export const HTTPRequest: React.SFC<IRequestProps> = ({
  verb,
  service,
  targetService,
  endpoint,
  headers,
  body,
  timestamp,
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
