import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../FMCCommand'
import { ISystem } from 'common'

export class HelloCommand extends FMCCommand {
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
    console.log('hi')
    const { configService } = this.system
    console.log(FMCCommand.bla.fn())
    // await configService.setSoilURL('asdasd')
    // const { devspace: { hiveReplUrl } } = await configService.readConfig()
    // const { flags: { host } } = this.parse(Repl)
    // const hiveREPL = host || hiveReplUrl
    // spawn('lein', ['repl', ':connect', hiveREPL], {
    //   stdio: [process.stdin, process.stdout, process.stderr],
    // })
  }
}

export default HelloCommand
