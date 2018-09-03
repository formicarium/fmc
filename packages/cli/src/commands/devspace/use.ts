import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../FMCCommand'
import chalk from 'chalk'
import { devspaceToDevspaceConfig } from '@formicarium/common'

export default class DevspaceUse extends FMCCommand {
  public static description = 'Configures to use one Devspace context'

  public static examples = [
    `$ fmc devspace:use paps`,
  ]

  public static flags = {
    help: Flags.help({ char: 'h' }),
  }

  public static args = [
    {
      name: 'name',
      required: true,
    },
  ]

  public async run() {
    const { configService, soilService, uiService } = this.system
    const { args } = this.parse(DevspaceUse)
    const { name } = args
    const devspace = await soilService.getDevspace(name)
    const devspaceConfig = devspaceToDevspaceConfig(devspace)
    await configService.setDevspaceConfig(devspaceConfig)
    uiService.info(`Now using Devspace: ${chalk.underline(name)}`)
  }
}
