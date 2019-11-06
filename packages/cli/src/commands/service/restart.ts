import { getServiceIdentifier } from '@formicarium/common'
import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../FMCCommand'
import { IOutputFlags } from '../../services/output'
import * as DevspaceController from '../../controllers/devspace'

export default class ServiceRestart extends FMCCommand {
  public static description = 'Restart a service deployed in dev mode'

  public static examples = [
    `$ fmc service:restart mancini`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
  }

  public static args = [
    { name: 'name', required: true },
  ]

  public async run() {
    const { configService, stingerService, uiService, outputService, soilService, localDB } = this.system
    const { args, flags } = this.parse(ServiceRestart)
    const { name } = args

    const {devspace: {name: currentDevspace}} = await configService.readConfig()

    const devspace = await soilService.getDevspace(currentDevspace)
    DevspaceController.updateDevspaceServices(localDB, devspace)

    outputService.put([{
      name,
    }], flags as IOutputFlags)

    uiService.spinner.start('Restarting service...')
    await stingerService.restartService(currentDevspace, name)
    uiService.spinner.succeed()
  }
}
