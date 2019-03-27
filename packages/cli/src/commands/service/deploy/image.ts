
import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../../FMCCommand'
import { parseArg } from '../../../logic/args'
import { IOutputFlags } from '../../../services/output'
import { getFileContent } from '../../../common'
import { IApplicationDefinition } from '@formicarium/common/lib'

export default class ServiceDeployImage extends FMCCommand {
  public static description = 'Deploys service image'

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
    filePath: Flags.string({
      char: 'f',
    }),
  }

  public static args = [
    { name: 'serviceName', required: true },
  ]

  public async run() {
    const { configService, uiService, outputService } = this.system
    const { devspace } = await configService.readConfig()

    const { args, flags } = this.parse(ServiceDeployImage)
    const { serviceName } = args
    const { arg, filePath } = flags

    const argMap = (arg && arg.length) ? parseArg(arg) : null

    outputService.put([{
      service: serviceName,
      arguments: argMap,
    }], flags as IOutputFlags)

    const definitionContent = filePath ? await getFileContent(filePath) : null

    /**
     * Deploy service on soil
     */
    uiService.spinner.start('Deploying service...')
    await this.system.soilService.deployService(devspace.name, serviceName, definitionContent as IApplicationDefinition, argMap as any, false)

    uiService.spinner.succeed()
  }
}
