import {
  ITanajuraService,
  IGitService,
  IConfigService,
  RemoteNotRegistered,
  getTanajuraRemoteName,
  isTanajuraAlreadyInRemotes,
  getTanajuraGitUrl,
  areRemotesEqual,
  LocalDB,
} from '@formicarium/common'
import { IUIService } from '../services/ui'
import { IService } from '@formicarium/common/lib/services/db'

export const shouldDeleteTanajuraRepo = async (serviceName: string, ui: IUIService): Promise<boolean> => {
  return ui.promptBoolean(`${serviceName} is already on remote git server, delete it ? (y/n)`)
}

export const overrideRemoteRepo = async (remoteName: string, ui: IUIService): Promise<boolean> => {
  return ui.promptBoolean(`${remoteName} is already on remotes, override? (y/n)`)
}

/**
 * Lists remotes on local git
 * If the remote name is already registered and urls are different, asks if wants to override
 * If wants to override, delete the old one and register again with new url
 * If the remote name does not exist, just add it
 * @param namespace string
 * @param localFolderPath string
 * @param service string
 * @param gitService GitService
 * @param configService ConfigService
 */
export const addRemote = async (namespace: string, localFolderPath: string, service: string, gitService: IGitService, configService: IConfigService, ui: IUIService) => {
  const remotes = await gitService.getRemotes(localFolderPath)
  const { tanajuraGitUrl } = await configService.readDevspaceConfig()
  const gitRemoteName = getTanajuraRemoteName(namespace)
  const wouldOverrideRemote = isTanajuraAlreadyInRemotes(remotes, namespace)
  const gitRemoteUrl = getTanajuraGitUrl(tanajuraGitUrl, service)

  if (wouldOverrideRemote) {
    const worryAboutOverriding = !areRemotesEqual(remotes, gitRemoteName, gitRemoteUrl)

    const override = worryAboutOverriding && await overrideRemoteRepo(gitRemoteName, ui)
    if (!override) {
      return
    }

    await gitService.removeRemote(localFolderPath, gitRemoteName)
  }

  await gitService.addRemote(localFolderPath, gitRemoteName, gitRemoteUrl)
}

/**
 * Tries to create repo on tanajura
 * If already exists, asks if wants to override
 * If wants to override, deletes service and calls itself recursively
 * If does not want to override, returns
 * @param namespace string
 * @param serviceName string
 * @param tanajuraService TanajuraService
 */
export const createRepo = async (namespace: string, serviceName: string, tanajuraApiUrl: string, tanajuraService: ITanajuraService, ui: IUIService): Promise<void> => {
  try {
    await tanajuraService.createRepo(tanajuraApiUrl, serviceName)
  } catch (err) {
    switch (err.type) {
      case 'RepoAlreadyExists':
        if (await shouldDeleteTanajuraRepo(serviceName, ui)) {
          await tanajuraService.deleteRepo(tanajuraApiUrl, serviceName)
          return createRepo(namespace, serviceName, tanajuraApiUrl, tanajuraService, ui)
        }

        break
      default:
        throw err
    }
  }
}

/**
 * 1. Creates repo on tanajura
 * 2. Adds remote to local git
 * 3. Pushes local git to remote
 * @param namespace string
 * @param serviceName string
 * @param localFolderPath string
 * @param tanajuraService TanajuraService
 * @param gitService GitService
 * @param configService ConfigService
 * @param ui UIService
 */
export const gitSetup = async (
  namespace: string,
  serviceName: string,
  localFolderPath: string,
  tanajuraApiUrl: string,
  tanajuraService: ITanajuraService,
  gitService: IGitService,
  configService: IConfigService,
  ui: IUIService,
): Promise<void> => {
  const isRepo = await gitService.checkIfRepo(localFolderPath)
  if (!isRepo) {
    console.log('Creating repo')
    await gitService.createMirrorRepo(localFolderPath)
    console.log('ok')
  }

  // const interactive = ui.newInteractive()
  ui.info('Step 1. create repo')
  await createRepo(namespace, serviceName, tanajuraApiUrl, tanajuraService, ui)
  ui.success('OK!')
  ui.log(`\n\n\n`)

  // const interactive2 = ui.newInteractive()
  ui.info('Step 2. Add remote')
  await addRemote(namespace, localFolderPath, serviceName, gitService, configService, ui)
  ui.success('OK!')
  ui.log(`\n\n\n`)

  // const interactive3 = ui.newInteractive()
  ui.info('Step 3. Push')
  await gitPush(namespace, localFolderPath, gitService)
  ui.success('OK!')
}

/**
 * Checks if the remote is registered
 * if it is, just push to "tanajura"
 * PA!
 * @param namespace string
 * @param localFolderPath string
 * @param gitService GitService
 */
export const gitPush = async (namespace: string, localFolderPath: string, gitService: IGitService) => {
  const remoteName = getTanajuraRemoteName(namespace)
  const remotes = await gitService.getRemotes(localFolderPath)
  const isAlreadyOnRemote = isTanajuraAlreadyInRemotes(remotes, namespace)

  if (!isAlreadyOnRemote) {
    throw new RemoteNotRegistered()
  }
  await gitService.push(localFolderPath, remoteName, 'tanajura')
}

export const deleteLocalRepoIfExists = async (uiService: IUIService, gitService: IGitService, localDB: LocalDB, devspaceName: string, serviceName: string) => {
  const service = await localDB.getService(devspaceName, serviceName) as IService
  if (service && service.repoPath) {
    uiService.warn(`Deleting local repo on ${service.repoPath}...`)
    gitService.deleteRepo(service.repoPath)
    uiService.success('Local repo deleted')
  } else {
    uiService.warn('Could not find local repository')
  }
}
