import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'

export interface IHttpClient {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
}

export enum HTTP_METHODS {
  GET = 'get',
  POST = 'post',
}

export class HttpClient implements IHttpClient {
  public request = <T = any>(config: AxiosRequestConfig): AxiosPromise<T> => {
    return axios.request<T>(config)
  }
}

export const httpClient = axios
