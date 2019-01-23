import FMCCommand from '../FMCCommand'
import { flags as Flags } from '@oclif/command'
import { spawn } from 'child_process'
import * as inquirer from 'inquirer'
import { IApplication } from '@formicarium/common'

export default class Curl extends FMCCommand {
  public static description = 'Make a curl request to the service in the devspace being used. You can pass any extra arguments to curl at the end of the command'

  public static strict = false
  public static examples = [
    `$ fmc curl GET purgatory /api/version`,
    `$ fmc curl POST -i default purgatory /do/something`,
    `$ fmc curl POST purgatory /do/something -d '{...}'`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
    interface: Flags.string({
      char: 'i',
      helpValue: '',
      name: 'interface',
      description: 'Interface to send the request',
    }),
  }

  public static args = [
    {
      name: 'method',
      required: true,
    },
    {
      name: 'serviceName',
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

  private async getLink(links: any) {
    const { flags } = this.parse(Curl)
    if (flags.interface === undefined) {
      const responses = await inquirer.prompt<{ interface: string }>([{
        name: 'interface',
        message: 'Select a Interface',
        type: 'list',
        choices: Object.keys(links),
      }])
      return links[responses.interface]
    } else {
      return links[flags.interface]
    }
  }

  private async getApplication(applications: IApplication[]) {
    const responses = await inquirer.prompt<{ applicationName: string }>([{
      name: 'applications',
      message: 'Select an Application',
      type: 'list',
      choices: applications.map((a) => a.name),
    }])
    return applications.find((a) => a.name === responses.applicationName)!
  }

  public async run() {
    const { configService, soilService } = this.system
    const { devspace: { name: currentDevspace } } = await configService.readConfig()
    const { args: { serviceName, method, path }, argv } = this.parse(Curl)
    const opts = argv.slice(3)
    const applications = await soilService.getService(currentDevspace, serviceName)
    const { links } = applications.length > 1 ? await this.getApplication(applications) : applications[0]
    const url = `${await this.getLink(links)}${path}`
    this.request(method, url, opts)
  }
}
