import { getServiceIdentifier } from 'common'
import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../FMCCommand'

export default class ServiceDeploy extends FMCCommand {
  public static description = 'Restart a service deployed in dev mode'

  public static examples = [
    `$ fmc service:restart mancini`,
  ]

  public static flags = {
    help: Flags.help({ char: 'h' }),
    shard: Flags.string({ char: 's', description: 'service shard' }),
  }

  public static args = [
    { name: 'name', required: true },
  ]

  public async run() {
    const { configService, stingerService, uiService } = this.system
    const { args, flags } = this.parse(ServiceDeploy)
    const { name } = args
    const { shard } = flags
    const config = await configService.readConfig()
    const { devspace } = config

    const serviceName = getServiceIdentifier(name, shard)

    uiService.jsonToTable({
      serviceName,
    })

    uiService.spinner.start('Restarting service...')
    const response = await stingerService.restartService(devspace.name, serviceName)
    uiService.spinner.succeed()
  }
}
