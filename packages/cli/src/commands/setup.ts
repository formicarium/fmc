import { flags as Flags } from '@oclif/command'
import FMCCommand from '../FMCCommand'

export default class Setup extends FMCCommand {
  public static description = 'Configures fmc CLI to one cluster'

  public static examples = [
    `$ fmc setup https://soil.your.host.here`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
  }

  public static args = [
    {
      name: 'url',
      required: true,
    },
  ]

  protected showDevspace(): boolean {
    return false
  }

  public async run() {
    const { uiService } = this.system
    const { args } = this.parse(Setup)
    const { url } = args
    await this.system.configService.setSoilURL(url)
    await this.system.configService.unsetDevspaceConfig()
    uiService.info(`Formicarium is now pointing to ${url}`)
  }
}
