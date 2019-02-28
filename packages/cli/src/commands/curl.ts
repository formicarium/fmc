import FMCCommand from '../FMCCommand'
import { flags as Flags } from '@oclif/command'
import { spawn } from 'child_process'
import { IApplication } from '@formicarium/common'

export default class Curl extends FMCCommand {
  public static description = 'Make a curl request to the service in the devspace being used. You can pass any extra arguments to curl at the end of the command'

  public static strict = false
  public static examples = [
    `$ fmc curl GET purgatory /api/version`,
    `$ fmc curl POST -i default purgatory /do/something`,
    `$ fmc curl POST purgatory /do/something -d '{...}'`,
    `$ fmc curl GET s0-purgatory /api/version`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
    interface: Flags.string({
      char: 'i',
      helpValue: '',
      name: 'interface',
      default: 'default',
      description: 'Interface to send the request',
    }),
  }

  public static args = [
    {
      name: 'method',
      required: true,
    },
    {
      name: 'applicationName',
      required: true,
    },
    {
      name: 'path',
      required: true,
    },
  ]

  private request(method: string, url: string, opts: any) {
    spawn('curl', [`-X${method}`, url, ...opts], {
      stdio: [process.stdin, process.stdout, process.stderr],
    })
  }

  private async getLink(application: IApplication) {
    const { flags } = this.parse(Curl)
    if (flags.interface === undefined) {
      this.selectLink(application)
    } else {
      return application.links[flags.interface]
    }
  }

  protected showDevspace(): boolean {
    return false
  }

  public async run() {
    const { args: { applicationName, method, path }, argv } = this.parse(Curl)
    const opts = argv.slice(3)
    const app = await this.getApplicationByName(applicationName)
    const url = `${await this.getLink(app)}${path}`
    this.request(method, url, opts)
  }
}
