import { LocalDB } from './db'
import { IHttpClient } from '../components/http-client'

export interface IStartResponse {
  ok: boolean
}

export class StingerService {
  private httpClient: IHttpClient
  private localDB: LocalDB

  constructor(httpClient: IHttpClient, localDB: LocalDB) {
    this.httpClient = httpClient
    this.localDB = localDB
  }

  public restartService = async (namespace: string, serviceName: string): Promise<IStartResponse[]> => {
    const service = await this.localDB.getService(namespace, serviceName)

    if (!service) {
      throw new Error(`${serviceName} not found`)
    }

    const { stingerUrls } = service

    return Promise.all(stingerUrls.map(stingerUrl => this.restartApplicationByUrl(stingerUrl)))
  }

  public restartApplicationByUrl = async (stingerUrl: string): Promise<IStartResponse> =>  {
    return this.httpClient.request<IStartResponse>({
      method: 'post',
      baseURL: stingerUrl,
      url: '/start',
    })
    .then((response) => response.data)
  }
}
