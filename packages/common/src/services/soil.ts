import {IDevspace, IApplicationDefinition, IApplicationLinks, IApplication} from '../model/devspace'
import { IHttpClient } from '../components/http-client'
import { Nullable } from '../utils/types'
import * as R from 'ramda'

export interface IArgs {
  [key: string]: string
}

export interface IDeployServiceResponse {
  namespace: string,
  'services-deployed': Array<{ name: string }>
}

export interface IBaseArgs {
  name: string,
  local: boolean,
  image?: string,
  version?: string,
}
export interface ISoilVersion {
  version: string
}

export enum AppStatus {
  HEALTHY = 'HEALTHY',
  DOWN = 'DOWN',
  CREATING = 'CREATING',
}

export interface IApp {
  name: string,
  version: string,
  status: AppStatus,
  lastRemoteCommit: string,
  lastLocalCommit: string,
  lastRemoteCommitTimestamp: Date
}

export interface IGetStatusResponse {
  apps: IApp[]
}

export interface ISoilService {
  createDevspace: (devspaceName: string, args: object, setup: Nullable<IApplicationDefinition[]>) => Promise<IDevspace>
  getDevspaces: () => Promise<IDevspace[]>
  getDevspace: (name: string) => Promise<IDevspace>
  getService: (devspace: string, name: string) => Promise<IApplication[]>
  deployService: (
    devspace: string, name: string,
    applicationDefinition: IApplicationDefinition | null,
    args: Nullable<IArgs>,
    syncable: boolean,
  ) => Promise<IApplication[]>
  getStatus: () => Promise<IGetStatusResponse>
  deleteService: (devspace: string, serviceName: string) => Promise<any>
  deleteDevspace: (devspace: string) => Promise<any>
  getVersion: () => Promise<string>
}
export class SoilService implements ISoilService {

  public url: string
  public httpClient: IHttpClient

  constructor(soilUrl: string, httpClient: IHttpClient) {
    this.url = soilUrl
    this.httpClient = httpClient
  }

  public createDevspace = async (devspaceName: string, args: object, setup: Nullable<IApplicationDefinition[]>): Promise<IDevspace> => {
    return this.httpClient.request<IDevspace>({
      baseURL: this.url,
      url: '/api/devspaces',
      method: 'post',
      data: {
        name: devspaceName,
        args,
        setup,
      },
    }).then((response) => response.data)
  }

  public getDevspaces = async (): Promise<IDevspace[]> => {
    return this.httpClient.request<IDevspace[]>({
      method: 'get',
      url: '/api/devspaces',
      baseURL: this.url,
    }).then((response) => response.data)
  }

  public getDevspace = async (name: string): Promise<IDevspace> => {
    return this.httpClient.request<IDevspace>({
      method: 'get',
      url: `/api/devspaces/${name}`,
      baseURL: this.url,
    }).then((response) => response.data)
  }

  public getService = async (devspace: string, name: string): Promise<IApplication[]> => {
    return this.httpClient.request<IApplication[]>({
      method: 'get',
      url: `/api/devspaces/${devspace}/services/${name}`,
      baseURL: this.url,
    }).then((response) => response.data)
  }

  public deployService = async (
    devspace: string, name: string,
    applicationDefinition: IApplicationDefinition | null,
    args: Nullable<IArgs>,
    syncable: boolean,
  ): Promise<IApplication[]> => {
    const data = R.pickBy((val) => val !== null, {
      name,
      syncable,
      args,
      definition: applicationDefinition,
    })

    return this.httpClient.request<IApplication[]>({
      data,
      method: 'post',
      url: `${this.url}/api/devspaces/${devspace}/services`,
    }).then((response) => response.data)
  }

  public getStatus = async (): Promise<IGetStatusResponse> => {
    return {
      apps: [{
        name: 'Mancini',
        version: '1.0.0',
        status: AppStatus.DOWN,
        lastRemoteCommit: 'abc',
        lastRemoteCommitTimestamp: new Date(),
        lastLocalCommit: 'xpto',
      }, {
        name: 'Mancini',
        version: '1.0.0',
        status: AppStatus.CREATING,
        lastRemoteCommit: 'abc',
        lastRemoteCommitTimestamp: new Date(),
        lastLocalCommit: 'xpto',
      }, {
        name: 'Mancini',
        version: '1.0.0',
        status: AppStatus.HEALTHY,
        lastRemoteCommit: 'abc',
        lastRemoteCommitTimestamp: new Date(),
        lastLocalCommit: 'xpto',
      }],
    }
  }

  public deleteService = async (devspace: string, serviceName: string) => {
    return this.httpClient.request({
      method: 'delete',
      baseURL: this.url,
      url: `/api/devspaces/${devspace}/services/${serviceName}`,
      data: {
        name: serviceName,
      },
    }).then((res) => res.data)
  }

  public deleteDevspace = async (devspace: string): Promise<any> => {
    return this.httpClient.request({
      method: 'delete',
      baseURL: this.url,
      url: `/api/devspaces/${devspace}`,
    })
  }

  public getVersion = async (): Promise<string> => {
    return this.httpClient.request<ISoilVersion>({
      method: 'get',
      url: '/api/version',
      baseURL: this.url,
    }).then((d) => d.data.version)
  }

}
