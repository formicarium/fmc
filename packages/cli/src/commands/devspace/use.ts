import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../FMCCommand'
import * as DevspaceController from '../../controllers/devspace'

export default class DevspaceUse extends FMCCommand {
  public static description = 'Get version information about the current devspace'

  public static examples = [
    `$ fmc devspace:use paps`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
  }

  public static args = [
    {
      name: 'name',
      required: true,
    },
  ]

  public async run() {
    const { args } = this.parse(DevspaceUse)
    const { name } = args

    DevspaceController.useDevspace(this.system, name)
  }
}
