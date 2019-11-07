import { getFileContent } from '../common'
import * as os from 'os'
import * as path from 'path'
import { IApplicationDefinition, LocalDB, IDevspace, devspaceToDevspaceConfig } from '@formicarium/common'
import { ISystem } from '../system'
import * as DevspaceAdapter from '../adapters/devspace'
import chalk from 'chalk'
import * as db from '@formicarium/common/lib/services/db'

export const createDevspace = async (id: string, args: object, system: ISystem) => {
  let setup: any
  try {
    setup = await getFileContent<IApplicationDefinition[]>(path.resolve(os.homedir(), '.fmc/setup.json'))
  } catch (err) {
    setup = null
  }
  return system.soilService.createDevspace(id, args, setup)
}

export const updateDevspaceServices = async (localDB: LocalDB, devspace: IDevspace) => {
  const services: db.IService[] = DevspaceAdapter.applicationsToServices(devspace.applications)
  localDB.registerExistingDevspace(devspace.name, services)
}

export const useDevspace = async (system: ISystem, id: string) => {
  const { configService, soilService, uiService, localDB } = system
  const devspace = await soilService.getDevspace(id)

  updateDevspaceServices(localDB, devspace)

  const devspaceConfig = devspaceToDevspaceConfig(devspace)
  await configService.setDevspaceConfig(devspaceConfig)

  uiService.info(`Now using Devspace: ${chalk.underline(id)}`)
}
