import { LowdbAsync } from 'lowdb'
import { Maybe } from '../typings/common'

export interface IService {
  name: string
  repoPath: string
  stingerUrl: string
}

export interface IServices {
  [service: string]: IService,
}

export interface IDevspace {
  services: IServices
}
export interface IDevspaces {
  [devspace: string]: IDevspace,
}
export interface IDataStructure {
  devspaces: IDevspaces
}

export class LocalDB {
  private db: LowdbAsync<IDataStructure>
  constructor(db: LowdbAsync<IDataStructure>) {
    this.db = db

    db.defaults({
      devspaces: {}
    }).write()
  }

  private startDb = () => {
    this.db.defaults({
      devspaces: {},
    }).write()
  }

  public registerDevspace = (devspace: string): Promise<IDevspaces> => {
    return this.db.get('devspaces')
      .set(devspace, {})
      .write()
  }

  public getDevspaceServices = (devspace: string): IDevspace => {
    return this.db.get('devspaces').get(devspace).value()
  }

  public registerServiceForDevspace = (devspace: string, service: IService): Promise<IDevspace> => {
    return this.db
      .set(`devspaces.${devspace}.${service.name}`, service)
      .write()
  }

  public getService = (devspace: string, serviceName: string): Promise<Maybe<IService>> => {
    return this.db
      .get(`devspaces.${devspace}.${serviceName}`)
      .value()
  }
}
