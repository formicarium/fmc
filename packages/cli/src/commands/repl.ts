import FMCCommand from '../FMCCommand'
import { flags as Flags } from '@oclif/command'
import { spawn } from 'child_process'

export default class Repl extends FMCCommand {
  public static description = "Connects to remote Hive's repl"

  public static examples = [
    `$ fmc repl`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
    host: Flags.string({ description: 'host to connect' }),
  }

  public async run() {
    const { configService } = this.system
    const { devspace: { hiveReplUrl } } = await configService.readConfig()
    const { flags: { host } } = this.parse(Repl)
    const hiveREPL = host || hiveReplUrl
    spawn('lein', ['repl', ':connect', hiveREPL], {
      stdio: [process.stdin, process.stdout, process.stderr],
    })
  }
}
