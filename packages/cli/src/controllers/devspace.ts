import { getFileContent } from '../common'
import * as os from 'os'
import * as path from 'path'
import { IApplicationDefinition, ISystem } from 'common'

export const createDevspace = async (id: string, system: ISystem) => {
  let setup: any
  try {
    setup = await getFileContent<IApplicationDefinition[]>(path.resolve(os.homedir(), '.fmc/setup.json'))
  } catch (err) {
    setup = null
  }
  return system.soilService.createDevspace(id, setup)
}
