import { ITreeNode } from './index';
import { IEvent } from '~/modules/tracing/graphql/queries/events';

export const getTreeNodeForSpan = (messages: IEvent[], spanId: string): ITreeNode => {
  const childrenSpans = Array.from(new Set(messages
    .filter((message) => message.payload.context.parentId === spanId)
    .filter((message) => messages.find((m) => m.payload.context.parentId === message.payload.context.spanId))
    .map((x) => x.payload.context.spanId)))

  return ({
    id: spanId,
    label: spanId,
    children: childrenSpans.map((child) => getTreeNodeForSpan(messages, child)),
  })
}
