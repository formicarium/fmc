import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../FMCCommand'
import * as codeController from '../../controllers/code'

export default class CodePush extends FMCCommand {
  public static description = 'Configures local fmcgit and hive'

  public static examples = [
    `$ fmc code:push sr-barriga`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
    watch: Flags.boolean({ char: 'w' }),
  }
  public static args = [
    { name: 'serviceName' },
  ]

  public async run() {
    const { args, flags } = this.parse(CodePush)
    const { serviceName } = args
    const { watch } = flags

    await codeController.codePush(this.system, serviceName, watch)
  }
}
