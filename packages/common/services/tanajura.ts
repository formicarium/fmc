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
  createRepo(name: string): Promise<ICreateRepoResponse>
  deleteRepo(name: string): Promise<IDeleteRepoResponse>
  getRepo(name: string): Promise<IRepo>
  getVersion: () => Promise<string>
}

const getStatusCode = R.pathOr(0, ['response', 'data', 'statusCode'])

export class TanajuraService implements ITanajuraService {
  private httpClient: IHttpClient
  private apiUrl: string
  private gitUrl: string

  constructor(apiUrl: string, gitUrl: string, httpClientInjected: IHttpClient) {
    this.httpClient = httpClientInjected
    this.apiUrl = apiUrl
    this.gitUrl = gitUrl
  }

  public createRepo(name: string): Promise<ICreateRepoResponse> {
    return this.httpClient.request<ICreateRepoResponse>({
      url: `${this.apiUrl}/api/repo`,
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

  public deleteRepo(name: string): Promise<IDeleteRepoResponse> {
    return this.httpClient.request<IDeleteRepoResponse>({
      url: `${this.apiUrl}/api/repo/${name}`,
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

  public getRepo(name: string): Promise<IRepo> {
    return this.httpClient.request<IRepo>({
      url: `${this.apiUrl}/api/repo/${name}`,
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

  public getVersion = async (): Promise<string> => {
    return this.httpClient.request<ITanajuraVersion>({
      method: 'get',
      url: '/api/version',
      baseURL: this.apiUrl,
    }).then((d) => d.data.version)
  }

}
