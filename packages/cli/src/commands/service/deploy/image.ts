import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../../FMCCommand'
import { IArgs, IBaseArgs } from '../../../services/soil'
import * as fs from 'fs-extra'
import { Nullable, Maybe } from '../../../typings/common'
import * as path from 'path'

export default class ServiceDeployImage extends FMCCommand {
  public static description = 'Deploys service'

  public static examples = [
    `$ fmc service:deploy:image -f my-args.json my-service my-image 1.0.0 --arg version=1 --arg xablau=xpto`,
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
    { name: 'image' },
    { name: 'version' },
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

  private getFileContent = async (filePath: Maybe<string>): Promise<Nullable<IArgs>> => {
    if (!filePath) {
      return null
    }

    const fileExists = await fs.pathExists(filePath)
    if (!fileExists) {
      throw new Error(`File ${filePath} does not exist`)
    }

    const fileContent = await fs.readJson(filePath) as IArgs

    return fileContent
  }

  public async run() {
    const { configService, soilService, uiService } = this.system
    const { devspace } = await configService.readConfig()

    const { args, flags } = this.parse(ServiceDeployImage)
    const { serviceName, image, version } = args
    const { filePath, arg } = flags

    const absoluteFilePath = filePath && path.resolve(process.cwd(), filePath)

    const argMap = this.parseArg(arg)
    const baseArgs: IBaseArgs = {
      local: false,
      name: serviceName,
      image,
      version,
    }

    uiService.jsonToTable({
      serviceName,
      absoluteFilePath,
      baseArgs: `${JSON.stringify(baseArgs)}`,
    })

    /**
     * Deploy service on soil
     */
    uiService.spinner.start('Deploying service...')
    await soilService.deployService(devspace.name, serviceName, null, argMap)
    uiService.spinner.succeed()
  }
}
