import { IEventMessage } from '~/modules/tracing/model/event';
import * as R from 'ramda'
import memoizeOne from 'memoize-one';

export const getUniqServicesFromEvents = memoizeOne((events: IEventMessage[]) => R.uniq(events.map((event) => event.meta.service)))
