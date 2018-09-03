import { IHttpClient } from '../components/http-client.mock'

interface IConfigServerVersion {
  version: string
}

export class ConfigServerService {

  public url: string
  public httpClient: IHttpClient

  constructor(configServerUrl: string, httpClient: IHttpClient) {
    this.url = configServerUrl
    this.httpClient = httpClient
  }

  public async getVersion(): Promise<string> {
    return this.httpClient.request<IConfigServerVersion>({
      method: 'get',
      url: '/api/version',
      baseURL: this.url,
    }).then((d) => d.data.version)
  }

}
