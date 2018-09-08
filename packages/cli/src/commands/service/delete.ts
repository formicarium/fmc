import { flags as Flags } from '@oclif/command'
import FMCCommand from 'src/FMCCommand'

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
    const { configService, soilService, uiService } = this.system
    const { args, flags } = this.parse(ServiceDelete)
    const { name } = args

    const config = await configService.readConfig()
    const { devspace } = config
    if (await uiService.promptBoolean(`Confirm deleting ${name} from ${devspace.name}? (y/n)`)) {
      uiService.warn(`Deleting ${name} from ${devspace.name}...`)
      await soilService.deleteService(devspace.name, name)
      uiService.success('Service Deleted')
    } else {
      uiService.info('Aborting Command')
    }
  }
}
