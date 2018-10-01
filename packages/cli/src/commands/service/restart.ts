import { getServiceIdentifier } from '@formicarium/common'
import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../FMCCommand'

export default class ServiceDeploy extends FMCCommand {
  public static description = 'Restart a service deployed in dev mode'

  public static examples = [
    `$ fmc service:restart mancini`,
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
    const { configService, stingerService, uiService, soilService } = this.system
    const { args, flags } = this.parse(ServiceDeploy)
    const { name } = args
    const { shard } = flags

    const {devspace: {name: currentDevspace}} = await configService.readConfig()
    const {links} = await soilService.getService(currentDevspace, name)

    uiService.jsonToTable({
      name,
    })

    uiService.spinner.start('Restarting service...')
    if(links.stinger) {
      await stingerService.restartServiceByUrl(links.stinger)
    } else {
      uiService.spinner.fail('Could not find stinger interface')
    }
    uiService.spinner.succeed()
  }
}
