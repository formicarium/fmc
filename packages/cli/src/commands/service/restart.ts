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
    help: Flags.help({ char: 'h' })
  }

  public static args = [
    { name: 'name', required: true },
  ]

  public async run() {
    const { configService, stingerService, uiService } = this.system
    const { args, flags } = this.parse(ServiceDeploy)
    const { name } = args

    const {devspace: {name: currentDevspace}} = await configService.readConfig()

    uiService.jsonToTable({
      name,
    })

    uiService.spinner.start('Restarting service...')
    await stingerService.restartService(currentDevspace, name)
    uiService.spinner.succeed()
  }
}
