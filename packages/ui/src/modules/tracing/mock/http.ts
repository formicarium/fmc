import { HTTPVerb } from '~/modules/tracing/components/HTTP/HTTPVerb';
import { EventType, Direction } from '~/modules/tracing/model/event';
import { IRequestProps } from '~/modules/tracing/components/HTTP/Request';

export const outProducer: IRequestProps = {
  spanId: 'O.A',
  direction: Direction.PRODUCER,
  eventType: EventType.HTTP_OUT,
  verb: HTTPVerb.POST,
  service: 'griswold',
  peerService: 'warriv',
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
}
export const inConsumer: IRequestProps = {
  spanId: 'O.A.B',
  direction: Direction.CONSUMER,
  eventType: EventType.HTTP,
  verb: HTTPVerb.POST,
  service: 'warriv',
  peerService: 'griswold',
  endpoint: '/api/people',
  headers: {
    Authorization: 'Bearer 123',
  },
  body: {
    name: 'Rafael',
    age: 25,
  },
  timestamp: new Date().getTime(),
}

export const inProducer: IRequestProps = {
  spanId: 'O.A.B',
  direction: Direction.PRODUCER,
  eventType: EventType.HTTP,
  verb: HTTPVerb.POST,
  service: 'warriv',
  peerService: 'griswold',
  endpoint: '/api/people',
  status: 200,
  headers: {
    resp: 'Hello',
  },
  body: {
    ok: true,
  },
  timestamp: new Date().getTime(),
}

export const outConsumer: IRequestProps = {
  spanId: 'O.A',
  direction: Direction.CONSUMER,
  eventType: EventType.HTTP_OUT,
  verb: HTTPVerb.POST,
  service: 'griswold',
  peerService: 'warriv',
  endpoint: '/api/people',
  status: 200,
  headers: {
    resp: 'Hello',
  },
  body: {
    ok: true,
  },
  timestamp: new Date().getTime(),
}
