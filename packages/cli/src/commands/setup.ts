import { flags as Flags } from '@oclif/command'
import FMCCommand from '../FMCCommand'

export default class Setup extends FMCCommand {
  public static description = 'Configures fmc CLI to one cluster'

  public static examples = [
    `$ fmc setup https://soil.your.host.here`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    pitfall: Flags.boolean({ char: 'p' }),
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
    const { uiService, configService } = this.system
    const { args, flags } = this.parse(Setup)
    const { pitfall } = flags
    const { url } = args

    if (pitfall) {
      await configService.setPitfallURL(url)
      uiService.info(`Formicarium Pitfall is now configured to ${url}`)
    } else {
      await configService.setSoilURL(url)
      await configService.unsetDevspaceConfig()
      uiService.info(`Formicarium is now pointing to ${url}`)
    }
  }
}
