import { IExplorerState } from './../state/ExplorerState/index';
import { IEventMessage } from '~/modules/tracing/model/event';
import memoizeOne from 'memoize-one';

export const getFilteredMessages = memoizeOne((messages: IEventMessage[], explorerState: IExplorerState) =>
  messages.filter((message) =>
    new RegExp(`${explorerState.spanFilter}(\\.(.*))?$`).test(message.meta.spanId)))
