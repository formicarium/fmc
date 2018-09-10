import React from 'react'
import { IEventMessage } from '../model/event';
import { MESSAGES } from '../mock/events';
import { getSortedMessages } from '~/modules/tracing/selectors/messages';

export interface IChildrenProps {
  messages: IEventMessage[]
}

export interface IWithMessagesProps {
  children: (props: IChildrenProps) => JSX.Element
}
export const WithMessages: React.SFC<IWithMessagesProps> = ({
  children,
}) => (
  children({ messages: getSortedMessages(MESSAGES)})
)
