import * as React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { hiveResponseMock } from '~/modules/tracing/mock/hive';
import { EVENTS_QUERY } from '~/modules/tracing/graphql/queries/events';

export const MOCKS = [{
  request: {
    query: EVENTS_QUERY,
  },
  result: hiveResponseMock,
}]

export const MockedHive: React.SFC = ({
  children,
}) => (
  <MockedProvider mocks={MOCKS} addTypename={false}>
    {children}
  </MockedProvider>
)
