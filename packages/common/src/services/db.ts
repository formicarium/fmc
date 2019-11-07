import { LowdbAsync } from 'lowdb'
import { Maybe } from '../utils/types'
import R from 'ramda'

export interface IService {
  name: string
  repoPath?: string
  stingerUrls: string[]
}

interface IServices {
  [service: string]: IService,
}

interface IDevspace {
  services: IServices
}
interface IDevspaces {
  [devspace: string]: IDevspace,
}
interface IDataStructure {
  devspaces: IDevspaces
}

export class LocalDB {
  private db: LowdbAsync<IDataStructure>
  constructor(db: LowdbAsync<IDataStructure>) {
    this.db = db

    db.defaults({
      devspaces: {},
    }).write()
  }

  public startDb = () => {
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

  public registerExistingDevspace = async (devspace: string, serviceList: IService[]): Promise<IDevspace> => {
    const services = R.reduce((services: IServices, service: IService) => {
      return {...services, [service.name]: R.merge(service, this.getService(devspace, service.name))}
    }, {}, serviceList)
    await this.db.set(`devspaces.${devspace}`, services).write()
    return this.getDevspaceServices(devspace)
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
