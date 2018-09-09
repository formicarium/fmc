import { v4 } from 'uuid';
import { IEventMessage } from './../../model/event';
import { ITreeNode } from './index';

export const getTreeNodeForSpan = (messages: IEventMessage[], spanId: string): ITreeNode => {
  const childrenSpans = Array.from(new Set(messages
    .filter((message) => message.meta.parentId === spanId)
    .map((x) => x.meta.spanId)))

  return ({
    id: v4(),
    label: spanId,
    children: childrenSpans.map((child) => getTreeNodeForSpan(messages, child)),
  })
}
