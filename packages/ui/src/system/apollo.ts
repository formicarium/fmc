import ApolloClient from '../lib/boost';
import { config } from './config';

export const client = new ApolloClient({
  uri: config.hiveUrl,
});
