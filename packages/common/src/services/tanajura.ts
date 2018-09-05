import { RepoAlreadyExists, RepoNotFound } from '../errors/tanajura'
import * as R from 'ramda'
import { IHttpClient } from '../components/http-client'

export interface ICreateRepoResponse {
  url: string
}

export interface IDeleteRepoResponse {
  ok: boolean
}

export interface ITanajuraVersion {
  version: string
}

export interface IRepo {
  name: string
}
export interface ITanajuraService {
  createRepo(apiUrl: string, name: string): Promise<ICreateRepoResponse>
  deleteRepo(apiUrl: string, name: string): Promise<IDeleteRepoResponse>
  getRepo(apiUrl: string, name: string): Promise<IRepo>
  getVersion: (apiUrl: string) => Promise<string>
  repoExists:(apiUrl: string, name: string) => Promise<boolean>
}

const getStatusCode = R.pathOr(0, ['response', 'data', 'statusCode'])

export class TanajuraService implements ITanajuraService {
  private httpClient: IHttpClient

  constructor(httpClientInjected: IHttpClient) {
    this.httpClient = httpClientInjected
  }

  public createRepo(apiUrl: string, name: string): Promise<ICreateRepoResponse> {
    return this.httpClient.request<ICreateRepoResponse>({
      url: `/api/repo`,
      baseURL: apiUrl,
      data: {
        name,
      },
      method: 'post',
    })
    .then((response) => response.data)
    .catch((err) => {
      const statusCode = getStatusCode(err)
      switch (statusCode) {
        case 409:
          throw new RepoAlreadyExists()
        default:
          throw err
      }
    })
  }

  public deleteRepo(apiUrl: string, name: string): Promise<IDeleteRepoResponse> {
    return this.httpClient.request<IDeleteRepoResponse>({
      url: `/api/repo/${name}`,
      baseURL: apiUrl,
      method: 'delete',
    })
    .then((response) => response.data)
    .catch((err) => {
      const statusCode = getStatusCode(err)
      switch (statusCode) {
        case 404:
          throw new RepoNotFound()
        default:
          throw err
      }
    })
  }

  public getRepo(apiUrl: string, name: string): Promise<IRepo> {
    return this.httpClient.request<IRepo>({
      url: `/api/repo/${name}`,
      baseURL: apiUrl,
      method: 'get',
    })
    .then((response) => response.data)
    .catch((err) => {
      const statusCode = getStatusCode(err)
      switch (statusCode) {
        case 404:
          throw new RepoNotFound()
        default:
          throw err
      }
    })
  }

  public repoExists = (apiUrl: string, name: string): Promise<boolean> => {
    return this.getRepo(apiUrl, name)
      .then(() => true)
      .catch((err) => {
        switch (err.type) {
          case 'RepoNotFound': return false
          default: throw err
        }
      })
  }

  public getVersion = async (apiUrl: string): Promise<string> => {
    return this.httpClient.request<ITanajuraVersion>({
      method: 'get',
      url: '/api/version',
      baseURL: apiUrl,
    }).then((d) => d.data.version)
  }

}
