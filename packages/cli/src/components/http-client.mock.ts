import { AxiosStatic, AxiosRequestConfig, AxiosPromise } from 'axios'

export interface IHttpClient {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
}

type Handler = (config: AxiosRequestConfig) => AxiosPromise<any>

export interface IMockMap {
  [url: string]: Handler
}

export class HttpClientMock {
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
