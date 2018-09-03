import { IHttpClient } from '../components/http-client.mock'

interface IHiveVersion {
  version: string
}

export class HiveService {

  public url: string
  public httpClient: IHttpClient

  constructor(hiveUrl: string, httpClient: IHttpClient) {
    this.url = hiveUrl
    this.httpClient = httpClient
  }

  public async getVersion(): Promise<string> {
    return this.httpClient.request<IHiveVersion>({
      method: 'get',
      url: '/version',
      baseURL: this.url,
    }).then((d) => d.data.version)
  }

}
