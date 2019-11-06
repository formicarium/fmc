import { IApplication } from '@formicarium/common'
import * as db from '@formicarium/common/src/services/db'
import R from 'ramda'

const applicationToService = (serviceName: string, apps: IApplication[]): db.IService => {
    return {
        name: serviceName,
        stingerUrls: R.filter((a) => a !== null && a !== undefined, R.map((a) => a.links.stinger, apps)),
    } as db.IService
}

export const applicationsToServices = (applications: IApplication[]): db.IService[] => {
    return R.pipe(
        (apps: IApplication[]) => R.groupBy((a) => a.service, apps),
        (serviceApps: {[service: string]: IApplication[]}) => R.toPairs(serviceApps),
        (pairs: Array<[string, IApplication[]]>) => R.map(([service, apps]) => applicationToService(service, apps), pairs),
    )(applications)
}
