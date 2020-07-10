import { IHttpClient } from '../components/http-client'

export interface IServiceMock {
  request: object
  response: object
}

export interface IServiceMockConfig {
  mocks: IServiceMock[] 
}

export interface IMocks {
  [serviceName: string]: IServiceMockConfig
}

export interface IPitfallService {
  getMocks: (devspaceName: string) => Promise<IMocks>
  upsertMocks: (devspaceName: string, mocks: IMocks) => Promise<IMocks>
}
export class PitfallService implements IPitfallService {

  public url: string
  public httpClient: IHttpClient

  constructor(pitfallUrl: string, httpClient: IHttpClient) {
    this.url = pitfallUrl
    this.httpClient = httpClient
  }

  public getMocks = async (devspaceName: string): Promise<IMocks> => {
    return this.httpClient.request<IMocks>({
      baseURL: this.url,
      url: '/formicarium/mocks/' + devspaceName,
      method: 'get',
    }).then((response) => response.data)
  }
  public upsertMocks = async (devspaceName: string, mocks: IMocks): Promise<IMocks> => {
    return this.httpClient.request<IMocks>({
      baseURL: this.url,
      url: '/formicarium/mocks/' + devspaceName,
      method: 'patch',
      data: mocks,
    }).then((response) => response.data)
  }
}
