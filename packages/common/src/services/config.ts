import * as path from 'path'
import * as fs from 'fs-extra'
import * as os from 'os'
import * as _ from 'lodash'

const homeDir = () => os.homedir()
const configFilePath = path.resolve(homeDir(), '.fmc/config.json')

export interface IDevspaceConfig {
  name: string
  hiveApiUrl: string
  hiveReplUrl: string
  tanajuraApiUrl: string
  tanajuraGitUrl: string,
  configServerUrl: string,
}

export interface IConfigContent {
  soilUrl: string
  devspace: IDevspaceConfig
  kubectlBin: string
  curlHeaders: Map<string, string>
}

export interface IConfigService {
  createConfigFile: () => Promise<void>
  readDevspaceConfig: () => Promise<IDevspaceConfig>
  readConfig: () => Promise<IConfigContent>
  setDevspaceConfig: (config: IDevspaceConfig) => Promise<void>
  unsetDevspaceConfig: () => Promise<void>
  setSoilURL: (uri: string) => Promise<void>
}
export class ConfigService implements IConfigService {

  public createConfigFile = async () => {
    await fs.ensureFile(configFilePath)
    await fs.writeJson(configFilePath, {
      devspace: {
      },
    })
  }

  public readDevspaceConfig = async (): Promise<IDevspaceConfig> => {
    const config = await this.readConfig()
    return config.devspace
  }

  public readConfig = async (): Promise<IConfigContent> => {
    const exists = await fs.pathExists(configFilePath)
    if (!exists) {
      await this.createConfigFile()
    }

    return fs.readJson(configFilePath)
  }

  public setDevspaceConfig = async (devspaceConfig: IDevspaceConfig): Promise<void> => {
    const currentConfig = await this.readConfig()
    await fs.writeJson(configFilePath, {
      ...currentConfig,
      devspace: devspaceConfig,
    })
  }

  public unsetDevspaceConfig = async (): Promise<void> => {
    const currentConfig = await this.readConfig()
    await fs.writeJson(configFilePath, {
      ...currentConfig,
      devspace: {},
    })
  }

  public setSoilURL = async (uri: string): Promise<void> => {
    const currentConfig = await this.readConfig()
    await fs.writeJson(configFilePath, {
      ...currentConfig,
      soilUrl: uri,
    })
  }
}
