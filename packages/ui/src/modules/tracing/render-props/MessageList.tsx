import React from 'react'
import { IEventMessage } from '../model/event';

export interface IChildrenProps {
  messages: IEventMessage[]
}

export interface IWithMessagesProps {
  children: (props: IChildrenProps) => JSX.Element
}
export const WithMessages: React.SFC<IWithMessagesProps> = ({
  children,
}) => (
  children({ messages: []})
)
