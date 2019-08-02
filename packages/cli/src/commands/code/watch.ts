import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../FMCCommand'
import * as codeController from '../../controllers/code'

export default class CodeWatch extends FMCCommand {
  public static description = 'Configures local fmcgit and hive'

  public static examples = [
    `$ fmc code:watch sr-barriga`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
  }
  public static args = [
    { name: 'serviceName' },
  ]

  public async run() {
    const { args } = this.parse(CodeWatch)
    const { serviceName } = args

    await codeController.codeWatch(this.system, serviceName, await this.currentDevspace())
  }
}
