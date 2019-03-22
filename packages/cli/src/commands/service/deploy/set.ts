import FMCCommand from '../../../FMCCommand'
import * as fs from 'fs-extra'
import { flags as Flags } from '@oclif/command'
import { IApplication } from '@formicarium/common'
import * as _ from 'lodash'
import { gitSetup } from '../../../controllers/git'

interface IServiceSetConfig {
  name: string
  localPath?: string
  args?: object
  syncable?: boolean
}

export default class ServiceDeploySet extends FMCCommand {

  public static description = 'Deploys a service set definition'

  public static examples = [
    `$ fmc service:deploy:set my-set.json`,
  ]

  public static args = [
    { name: 'filePath' },
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
  }

  private getFileContent = async <T = any>(filePath: string): Promise<T> => {
    const fileExists = await fs.pathExists(filePath)
    if (!fileExists) {
      throw new Error(`File ${filePath} does not exist`)
    }
    const fileContent = await fs.readJson(filePath) as T
    return fileContent
  }

  private interpolateEnvVars = (baseStr: string) => {
    return _.reduce(process.env, (res, val, key) => {
      return res.replace(`$${key}`, val!)
    }, baseStr)
  }

  public async run() {
    const { configService, tanajuraService, gitService, uiService, localDB, outputService } = this.system
    const { devspace } = await configService.readConfig()
    const { args: { filePath }, flags } = this.parse(ServiceDeploySet)
    const content = await this.getFileContent(filePath)
    const services: IServiceSetConfig[] = content.services.map((service) => {
      if (service.localPath) {
        return { ...service, localPath: this.interpolateEnvVars(service.localPath), syncable: true }
      } else {
        return { ...service, syncable: false }
      }
    })

    for (const service of services) {
      if (service.syncable) {
        outputService.put([{
          service: service.name,
          repository: service.localPath,
        }], flags as any)
        await gitSetup(devspace.name, service.name, service.localPath!, devspace.tanajuraApiUrl, tanajuraService, gitService, configService, uiService)
      }
    }

    uiService.spinner.start('Deploying services...')
    const response = await this.system.soilService.deployServiceSet(devspace.name, { services })!

    for (const service of services) {
      if (service.syncable) {
        await localDB.registerServiceForDevspace(devspace.name, {
          name: service.name,
          repoPath: service.localPath!,
          stingerUrls: response.filter((app) => app.service === service.name).map((app: IApplication) => app.links.stinger),
        })
      }
    }
    uiService.spinner.succeed()
  }

}
