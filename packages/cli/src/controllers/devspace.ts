import { getFileContent } from '../common'
import * as os from 'os'
import * as path from 'path'
import { ISystem } from '../system'
import { IApplicationDefinition } from '@formicarium/common'

export const createDevspace = async (id: string, system: ISystem) => {
  let setup
  try {
    setup = await getFileContent<IApplicationDefinition[]>(path.resolve(os.homedir(), '.fmc/setup.json'))
  } catch (err) {
    setup = null
  }
  return system.soilService.createDevspace(id, setup)
}
