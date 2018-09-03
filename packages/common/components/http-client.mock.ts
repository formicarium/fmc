import { IHttpClient } from './../../cli/src/components/http-client.mock';
import { AxiosRequestConfig, AxiosPromise } from 'axios'

type Handler = (config: AxiosRequestConfig) => AxiosPromise<any>

export interface IMockMap {
  [url: string]: Handler
}

export class HttpClientMock implements IHttpClient {
  public mocks: IMockMap

  constructor(mocks: IMockMap) {
    this.mocks = mocks
  }

  public request = <T = any>(config: AxiosRequestConfig): AxiosPromise<T> => {
    const url = config.url as string
    const handler = this.mocks[url]
    if (!handler) {
      throw new Error('Handler not found')
    }
    if (typeof handler === 'function') {
      return handler(config)
    }

    return handler
  }
}
