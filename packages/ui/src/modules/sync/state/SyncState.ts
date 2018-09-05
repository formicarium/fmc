import { Container } from 'unstated';
import { IHashMap, ISystem, getTanajuraRemoteName, RemoteNotRegistered, isTanajuraAlreadyInRemotes, getTanajuraGitUrl } from 'common';
import fs from 'fs'
import R from 'ramda'
import _ from 'lodash'

export enum SyncedFileStatus {
  WAITING = 0,
  SYNCED = 1,
  ERROR = 2,
}
export interface ISyncedFile {
  path: string
  status: SyncedFileStatus
  timestamp: number
}

export interface ISync {
  id: string
  devspace: string
  applicationName: string
  folder: string
  syncedFiles: ISyncedFile[]
  watcher: fs.FSWatcher
}

export type ISyncMap = IHashMap<ISync>

export interface ISyncState {
  syncMap: ISyncMap
}

const baseRegexTest = (x: string) => !/\.git|\.fmcgit/.test(x)

const getSyncId = (devspace: string, applicationName: string) => `${devspace}/${applicationName}`
const syncMapLens = R.lensProp('syncMap')
const getSyncedFilesLensForId = (id: string) => R.compose(syncMapLens, R.lensPath([id, 'syncedFiles'])) as R.Lens

const buildSyncedFile = (path: string) => ({
  path,
  status: SyncedFileStatus.WAITING,
  timestamp: new Date().getTime(),
})
export class SyncState extends Container<ISyncState> {
  private system: ISystem

  constructor(system: ISystem) {
    super()
    this.system = system
    this.state = {
      syncMap: {},
    }
  }

  private syncFlow = async (sync: ISync) => {
    const { gitService, configService } = this.system
    const { folder, id, devspace, applicationName } = sync

    // Create mirror .git
    if (!await gitService.alreadyHasMirrorRepo(folder)) {
      await gitService.createMirrorRepo(folder)
    }

    // Add in mirror .git
    await gitService.gitAddAll(folder)

    // Commit in mirror .git
    await gitService.gitCommit(folder)

    const gitRemoteName = getTanajuraRemoteName(devspace)
    const remotes = await gitService.getRemotes(folder)
    const isAlreadyOnRemote = isTanajuraAlreadyInRemotes(remotes, devspace)

    if (!isAlreadyOnRemote) {
      const { tanajuraGitUrl } = await configService.readDevspaceConfig()
      const gitRemoteUrl = getTanajuraGitUrl(tanajuraGitUrl, applicationName)
      await gitService.addRemote(folder, gitRemoteName, gitRemoteUrl)
    }

    await gitService.push(folder, gitRemoteName, 'tanajura')

    const updateSyncedFileStatus = R.cond([
        [R.pathEq(['status'], SyncedFileStatus.WAITING), R.assoc('status', SyncedFileStatus.SYNCED)],
        [R.T, R.identity],
      ])
    const syncedFilesLens = R.lensPath(['syncMap', id, 'syncedFiles'])
    const updateSyncFilesState = R.over(syncedFilesLens, R.map(updateSyncedFileStatus))
    this.setState(updateSyncFilesState)
  }

  private debouncedSyncFlow = _.debounce(this.syncFlow, 100)

  private setupWatcher = (id: string, folder: string): fs.FSWatcher => {
    return this.system.filesService.startWatching('/tmp/test', (ev, filePath) => {
      const syncedFilesLens = getSyncedFilesLensForId(id)
      const syncedFile = buildSyncedFile(folder)
      const addSyncedFileToState = R.over(syncedFilesLens, R.append(syncedFile))
      this.setState(addSyncedFileToState)

      if (this.state.syncMap[id]) {
        this.debouncedSyncFlow(this.state.syncMap[id])
      }
    }, baseRegexTest)
  }

  public startSyncing = (devspace: string, applicationName: string, folder: string) => {
    this.stopSyncing(devspace, applicationName)
    const id = getSyncId(devspace, applicationName)
    const watcher = this.setupWatcher(id, folder)
    const sync: ISync = {
      id,
      devspace,
      applicationName,
      folder,
      syncedFiles: [],
      watcher,
    }

    const addSyncById = R.assoc(sync.id, sync)
    const addSyncToMap = R.over(syncMapLens, addSyncById)
    this.setState(addSyncToMap)
  }

  public getSyncList = (): ISync[] => R.values(this.state.syncMap)

  public stopSyncing = (devspaceName: string, applicationName: string) => {
    const id = getSyncId(devspaceName, applicationName)
    const sync = this.state.syncMap[id]
    if (sync) {
      const dissocBySyncId = R.dissoc(sync.id)
      sync.watcher.close()
      const removeSyncFromMap = R.over(syncMapLens, dissocBySyncId)
      this.setState(removeSyncFromMap)
    }
  }

  public clearAllWatchers = () => {
    Object.keys(this.state.syncMap).forEach((id) => {
      console.log('clearing watcher for ', id)
      const { watcher } = this.state.syncMap[id]
      watcher.close()
    })
  }

  public getApplicationsSyncing = (): IHashMap<boolean> => {
    return R.keys(this.state.syncMap).reduce((acc, id) => ({
      ...acc,
      [this.state.syncMap[id].applicationName]: true,
    }), {})
  }
}
