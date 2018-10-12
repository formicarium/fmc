import * as R from 'ramda'
import memoizeOne from 'memoize-one';
import { IEvent } from '~/modules/tracing/graphql/queries/events';

export const getUniqServicesFromEvents = memoizeOne((events: IEvent[]) => R.uniq(events.map((event) => event.meta.service)))
