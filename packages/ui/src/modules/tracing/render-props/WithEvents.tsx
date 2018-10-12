import React, { ReactNode } from 'react'
import { Query } from 'react-apollo';
import { EVENTS_QUERY, IEvent } from '~/modules/tracing/graphql/queries/events';
import { Loader } from 'semantic-ui-react';

export interface IChildrenProps {
  events: IEvent[]
}
export interface IWithEventsProps {
  children: (childrenProps: IChildrenProps) => ReactNode
}

export const WithEvents: React.SFC<IWithEventsProps> = ({
  children
}) => (
  <Query query={EVENTS_QUERY}>
    {({ data, error }) => {
      if (error) {
        return (
          <div>
            Error! {error.toString()}
          </div>
        )
      }

      if (data) {
        return children({ events: data.events })
      }

      return (
        <Loader />
      )
    }}
  </Query>
)
