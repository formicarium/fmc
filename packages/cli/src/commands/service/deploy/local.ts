
import { gitSetup } from './../../../controllers/git'
import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../../FMCCommand'
import * as fs from 'fs-extra'
import { Nullable } from '../../../typings/common'
import * as path from 'path'
import { IApplicationDefinition, IArgs } from 'common'

export default class ServiceDeployLocal extends FMCCommand {
  public static description = 'Deploys service'

  public static examples = [
    `$ fmc service:deploy:local -l . -f my-args.json my-service --arg version=1 --arg xablau=xpto`,
  ]

  public static flags = {
    help: Flags.help({ char: 'h' }),
    filePath: Flags.string({ char: 'f', description: 'absoluteFilePath' }),
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

  private getFileContent = async <T>(filePath: string): Promise<Nullable<T>> => {
    const fileExists = await fs.pathExists(filePath)
    if (!fileExists) {
      throw new Error(`File ${filePath} does not exist`)
    }

    const fileContent = await fs.readJson(filePath) as T

    return fileContent
  }

  public async run() {
    const { configService, tanajuraService, gitService, uiService, localDB } = this.system
    const { devspace } = await configService.readConfig()

    const { args, flags } = this.parse(ServiceDeployLocal)
    const { serviceName, localPath } = args
    const { filePath, arg } = flags

    const absoluteLocalRepoPath = localPath && path.resolve(process.cwd(), localPath)
    const absoluteFilePath = filePath && path.resolve(process.cwd(), filePath)

    const applicationDefinition = absoluteFilePath ? await this.getFileContent<IApplicationDefinition>(absoluteFilePath) : null
    const argMap = (arg && arg.length) ? this.parseArg(arg) : null

    uiService.jsonToTable({
      serviceName,
      absoluteLocalRepoPath,
      absoluteFilePath,
      applicationDefinition: applicationDefinition ? `${JSON.stringify(applicationDefinition)}` : '-',
      argMap: argMap ? `${JSON.stringify(argMap)}` : '-',
    })

    await gitSetup(devspace.name, serviceName, absoluteLocalRepoPath, tanajuraService, gitService, configService, uiService)

    /**
     * Deploy service on soil
     */
    uiService.spinner.start('Deploying service...')
    const response = await this.system.soilService.deployService(devspace.name, serviceName, applicationDefinition, args)

    await localDB.registerServiceForDevspace(devspace.name, {
      name: serviceName,
      repoPath: absoluteLocalRepoPath,
      stingerUrl: response.stinger,
    })

    uiService.spinner.succeed()
  }
}
