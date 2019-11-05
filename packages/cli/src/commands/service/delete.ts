import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../FMCCommand'
import {IService} from '@formicarium/common/src/services/db'
import * as GitController from '../../controllers/git'
export default class ServiceDelete extends FMCCommand {
  public static description = 'Deletes a service in the current Devspace'

  public static examples = [
    `$ fmc service:delete mancini`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
    shard: Flags.string({ char: 's', description: 'service shard' }),
  }

  public static args = [
    { name: 'name', required: true },
  ]

  public async run() {
    const { configService, localDB, gitService, soilService, uiService, tanajuraService } = this.system
    const { args } = this.parse(ServiceDelete)
    const { name } = args

    const config = await configService.readConfig()
    const { devspace } = config
    if (await uiService.promptBoolean(`Confirm deleting ${name} from ${devspace.name}? (y/n)`)) {
      uiService.warn(`Deleting ${name} from ${devspace.name}...`)
      const apps = await soilService.getService(devspace.name, name)
      await soilService.deleteService(devspace.name, name)
      uiService.warn(`Deleting remote repos for ${name} from ${devspace.name}...`)
      await apps.forEach((app) => {
        tanajuraService.deleteRepo(config.devspace.tanajuraApiUrl, app.name)
      })

      await GitController.deleteLocalRepoIfExists(uiService, gitService, localDB, devspace.name, name)
      uiService.success('Service deleted!')
    } else {
      uiService.info('Aborting Command')
    }
  }
}
