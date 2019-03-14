
import { gitSetup } from '../../../controllers/git'
import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../../FMCCommand'
import * as fs from 'fs-extra'
import * as path from 'path'
import { IApplicationDefinition, IApplication, Nullable } from '@formicarium/common'
import { parseArg } from '../../../logic/args'
import { IOutputFlags } from '../../../services/output'

export default class ServiceDeployLocal extends FMCCommand {
  public static description = 'Deploys service'

  public static examples = [
    `$ fmc service:deploy:local -l . -f my-args.json my-service --arg version=1 --arg xablau=xpto`,
  ]

  public static flags = {
    ...FMCCommand.flags,
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

  private getFileContent = async <T>(filePath: string): Promise<Nullable<T>> => {
    const fileExists = await fs.pathExists(filePath)
    if (!fileExists) {
      throw new Error(`File ${filePath} does not exist`)
    }

    const fileContent = await fs.readJson(filePath) as T

    return fileContent
  }

  public async run() {
    const { configService, tanajuraService, gitService, uiService, localDB, outputService } = this.system
    const { devspace } = await configService.readConfig()

    const { args, flags } = this.parse(ServiceDeployLocal)
    const { serviceName, localPath } = args
    const { filePath, arg } = flags

    const absoluteLocalRepoPath = localPath && path.resolve(process.cwd(), localPath)
    const absoluteFilePath = filePath && path.resolve(process.cwd(), filePath)

    const applicationDefinition: any = absoluteFilePath ? await this.getFileContent<IApplicationDefinition>(absoluteFilePath) : null
    const argMap = (arg && arg.length) ? parseArg(arg) : null

    outputService.put([{
      service: serviceName,
      repository: absoluteLocalRepoPath,
      filepath: absoluteFilePath,
      definition: applicationDefinition,
    }], flags as IOutputFlags)

    await gitSetup(devspace.name, serviceName, absoluteLocalRepoPath, devspace.tanajuraApiUrl, tanajuraService, gitService, configService, uiService)

    /**
     * Deploy service on soil
     */
    uiService.spinner.start('Deploying service...')
    const response = await this.system.soilService.deployService(devspace.name, serviceName, applicationDefinition, {}, true)

    await localDB.registerServiceForDevspace(devspace.name, {
      name: serviceName,
      repoPath: absoluteLocalRepoPath,
      stingerUrls: response.map((app: IApplication) => app.links.stinger),
    })

    uiService.spinner.succeed()
  }
}
