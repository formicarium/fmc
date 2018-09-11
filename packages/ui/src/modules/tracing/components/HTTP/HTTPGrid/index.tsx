import React from 'react'
import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';
import { HTTPRequest, IRequestProps } from '~/modules/tracing/components/HTTP/Request';
import { HTTPResponse, IResponseProps } from '~/modules/tracing/components/HTTP/Response';
import { HTTPVerb } from '~/modules/tracing/components/HTTP/HTTPVerb';
import { EventType } from '~/modules/tracing/model/event';

export const DraggablePanel = styled.div`
  background-color: #FFF;
  margin: 0px !important;
  overflow: hidden;
`

export const requestOut: IRequestProps = {
  eventType: EventType.HTTP_OUT,
  verb: HTTPVerb.POST,
  service: 'griswold',
  targetService: 'warriv',
  endpoint: '/api/people',
  headers: {
    Authorization: 'Bearer 123',
  },
  body: {
    name: 'Rafael',
    age: 25,
    friends: [{
      name: 'Lucas',
    }],
  },
  timestamp: new Date().getTime(),
}
export const requestIn: IRequestProps = {
  eventType: EventType.HTTP,
  verb: HTTPVerb.POST,
  service: 'griswold',
  targetService: 'warriv',
  endpoint: '/api/people',
  headers: {
    Authorization: 'Bearer 123',
  },
  body: {
    name: 'Rafael',
    age: 25,
  },
  timestamp: new Date().getTime(),
}

export const responseOut: IResponseProps = {
  eventType: EventType.HTTP_OUT,
  status: 201,
  service: 'warriv',
  headers: {
    header1: 'ok',
  },
  body: {
    ok: true,
  },
}

export const responseIn: IResponseProps = {
  eventType: EventType.HTTP,
  status: 201,
  service: 'warriv',
  headers: {
    header1: 'ok',
  },
  body: {
    ok: true,
  },
}

export interface IHTTPGridProps {
  clientRequest: IRequestProps,
  serverRequest: IRequestProps,
  serverResponse: IResponseProps
  clientResponse: IResponseProps
}
export class HTTPGrid extends React.Component<IHTTPGridProps> {
  public render() {
    const {
      clientRequest,
      serverRequest,
      serverResponse,
      clientResponse
    } = this.props
    return (
      <div style={{width: '100%', height: '100%', padding: 10, backgroundColor: '#f7f7f7', display: 'grid', gridColumnGap: 10, gridRowGap: 10, gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr'}}>
        <Segment style={{margin: 0, backgroundColor: '#FFF'}}>
          <HTTPRequest
            {...clientRequest}
          />
        </Segment>

        <Segment style={{margin: 0, backgroundColor: '#FFF'}}>
          <HTTPRequest
            {...serverRequest}
          />
        </Segment>
        <Segment style={{margin: 0, backgroundColor: '#FFF'}}>
          <HTTPResponse
            {...clientResponse}
          />
        </Segment>
        <Segment style={{margin: 0, backgroundColor: '#FFF'}}>
          <HTTPResponse
            {...serverResponse}
          />
        </Segment>
      </div>
    )
  }
}
