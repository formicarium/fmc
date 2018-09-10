import React from 'react'
import { Segment, Divider } from 'semantic-ui-react';
import { CollapsableItem } from '~/modules/common/components/CollapsableItem';
import { IRequestProps, HTTPRequest } from '~/modules/tracing/components/HTTP/Request';
import { IResponseProps, HTTPResponse } from '~/modules/tracing/components/HTTP/Response';
import { DisplayHTTPStatus } from '~/modules/tracing/components/HTTP/HTTPStatus';
import { DisplayHTTPVerb } from '~/modules/tracing/components/HTTP/HTTPVerb';
import _ from 'lodash'

export interface IHTTPPanelProps {
  request: IRequestProps
  response: IResponseProps
}

export const HTTPPanel: React.SFC<IHTTPPanelProps> = ({
  request,
  response,
}) => (
  <Segment>
    HTTP | {request.service} -> {request.targetService} | {request.endpoint} | {response.status}
    <Divider />
    <Segment style={{padding: 0}}>
      <CollapsableItem
        id='request'
        open
        iconName='arrow up'
        onToggle={_.noop}
        titleContent={(
          <div>
            <span style={{marginRight: 20}}>REQUEST</span>
            <DisplayHTTPVerb verb={request.verb} /> <b style={{marginLeft: 20}}>http://warriv/api/people</b>
          </div>
        )}
      >
        <HTTPRequest
          {...request}
        />
      </CollapsableItem>

      <CollapsableItem
        id='request'
        open
        iconName='arrow up'
        onToggle={_.noop}
        titleContent={(
          <div>
            <span style={{marginRight: 20}}>RESPONSE</span>
            <DisplayHTTPStatus status={response.status} />
          </div>
        )}
      >
        <HTTPResponse
          {...response}
        />
      </CollapsableItem>
    </Segment>

  </Segment>
)

/*
<HTTPPanel
  request={{
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
  }}
  response={{
    status: 201,
    service: 'warriv',
    headers: {
      header1: 'ok',
    },
    body: {
      ok: true,
    },
  }}
/>
*/
