
import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../../FMCCommand'
import { parseArg } from './logic'

export default class ServiceDeployImage extends FMCCommand {
  public static description = 'Deploys service'

  public static examples = [
    `$ fmc service:deploy:image my-service`,
    `$ fmc service:deploy:image my-service --arg version=5cfc8f3`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
    arg: Flags.string({
      char: 'a',
      description: 'an arg to be sent to config server',
      multiple: true,
      required: false,
    }),
  }

  public static args = [
    { name: 'serviceName' },
  ]

  public async run() {
    const { configService, uiService } = this.system
    const { devspace } = await configService.readConfig()

    const { args, flags } = this.parse(ServiceDeployImage)
    const { serviceName } = args
    const { arg } = flags

    const argMap = (arg && arg.length) ? parseArg(arg) : null

    uiService.jsonToTable({
      serviceName,
      argMap: argMap ? `${JSON.stringify(argMap)}` : '-',
    })

    /**
     * Deploy service on soil
     */
    uiService.spinner.start('Deploying service...')
    await this.system.soilService.deployService(devspace.name, serviceName, null as any, argMap as any, false)

    uiService.spinner.succeed()
  }
}