
import { gitSetup } from '../../../controllers/git'
import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../../FMCCommand'
import * as fs from 'fs-extra'
import * as path from 'path'
import { IApplicationDefinition, IArgs, Nullable } from '@formicarium/common'

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
    { name: 'localPath' },
  ]

  private parseArg = (argString: string[]): IArgs => {
    return argString.reduce((acc, arg) => {
      const [ key, value ] = arg.split('=')
      return {
        ...acc,
        [key]: value,
      }
    }, {})
  }

  public async run() {
    const { configService, tanajuraService, gitService, uiService, localDB } = this.system
    const { devspace } = await configService.readConfig()

    const { args, flags } = this.parse(ServiceDeployImage)
    const { serviceName, localPath } = args
    const { arg } = flags

    const argMap = (arg && arg.length) ? this.parseArg(arg) : null

    uiService.jsonToTable({
      serviceName,
      argMap: argMap ? `${JSON.stringify(argMap)}` : '-',
    })

    /**
     * Deploy service on soil
     */
    uiService.spinner.start('Deploying service...')
    const response = await this.system.soilService.deployService(devspace.name, serviceName, null, argMap, false)

    await localDB.registerServiceForDevspace(devspace.name, {
      name: serviceName,
      repoPath: null,
      stingerUrl: response.stinger,
    })

    uiService.spinner.succeed()
  }
}
