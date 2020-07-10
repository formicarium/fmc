import low from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
import * as path from 'path'
import * as os from 'os'
import {
  IConfigService,
  HiveService,
  SoilService,
  IGitService,
  ITanajuraService,
  ConfigServerService,
  LocalDB,
  StingerService,
  IFilesService,
  ConfigService,
  GitService,
  TanajuraService,
  FilesService,
  IHttpClient,
  httpClient,
  KubectlService,
  IKubectlService,
  IPitfallService,
  PitfallService,
} from '@formicarium/common'
import { IUIService, UIService } from './services/ui'
import { IOutputService, OutputService } from './services/output'

export interface ISystem {
  configService: IConfigService
  hiveService: HiveService
  soilService: SoilService
  gitService: IGitService
  tanajuraService: ITanajuraService
  configServerService: ConfigServerService
  uiService: IUIService,
  localDB: LocalDB,
  stingerService: StingerService
  httpClient: IHttpClient
  filesService: IFilesService
  kubectl: IKubectlService
  outputService: IOutputService
  pitfallService: IPitfallService
}

export const getSystem = async (): Promise<ISystem> => {
  const configService = new ConfigService()
  const { devspace: { hiveApiUrl, configServerUrl }, soilUrl, pitfallUrl } = await configService.readConfig()
  const hiveService = new HiveService(hiveApiUrl, httpClient)
  const soilService = new SoilService(soilUrl, httpClient)
  const gitService = new GitService()
  const tanajuraService = new TanajuraService(httpClient)
  const configServerService = new ConfigServerService(configServerUrl, httpClient)
  const dbPath = path.resolve(os.homedir(), '.fmc/db.json')
  const db = await low(new FileAsync(dbPath))
  const localDB = new LocalDB(db)
  const stingerService = new StingerService(httpClient, localDB)
  const filesService = new FilesService()
  const uiService = new UIService()
  const kubectl = new KubectlService()
  const outputService = new OutputService()
  const pitfallService = new PitfallService(pitfallUrl, httpClient)

  return {
    configService,
    soilService,
    hiveService,
    gitService,
    tanajuraService,
    configServerService,
    uiService,
    localDB,
    stingerService,
    httpClient,
    filesService,
    kubectl,
    outputService,
    pitfallService,
  }
}
