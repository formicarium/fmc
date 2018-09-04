import * as low from 'lowdb'
import * as FileAsync from 'lowdb/adapters/FileAsync'
import * as path from 'path'
import * as os from 'os'
import { IConfigService, HiveService, SoilService, IGitService, ITanajuraService, ConfigServerService, IUIService, LocalDB, StingerService, IFilesService, ConfigService, GitService, TanajuraService, FilesService, UIService } from './services';
import { IHttpClient, httpClient } from './components';
import { KubectlService, IKubectlService } from './services/kubectl';

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
}

export const getSystem = async (): Promise<ISystem> => {
  const configService = new ConfigService()
  const { devspace: { hiveApiUrl, tanajuraApiUrl, configServerUrl }, soilUrl } = await configService.readConfig()
  const hiveService = new HiveService(hiveApiUrl, httpClient)
  const soilService = new SoilService(soilUrl, httpClient)
  const gitService = new GitService()
  const tanajuraService = new TanajuraService(tanajuraApiUrl, httpClient)
  const configServerService = new ConfigServerService(configServerUrl, httpClient)
  const dbPath = path.resolve(os.homedir(), '.fmc/db.json')
  const db = await low(new FileAsync(dbPath))
  const localDB = new LocalDB(db)
  const stingerService = new StingerService(httpClient, localDB)
  const filesService = new FilesService()
  const uiService = new UIService()
  const kubectl = new KubectlService()

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
    kubectl
  }
}
