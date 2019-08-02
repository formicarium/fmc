import { ISystem } from '../system'
import { LocalDB, IGitService } from '@formicarium/common'
import * as gitController from './git'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as gitignoreParser from 'gitignore-parser'
import * as R from 'ramda'
import * as __ from 'lodash'
import * as logicPath from '../logic/path'

const getRepoPath = async (serviceName: string, namespace: string, localDB: LocalDB): Promise<string> => {
    if (!serviceName) {
      return process.cwd()
    }

    const service = await localDB.getService(namespace, serviceName)

    if (!service) {
      throw new Error(`${serviceName} in ${namespace} not found`)
    }

    return service.repoPath
}
const syncFlow = async (namespace: string, localFolderPath: string, gitService: IGitService) => {
    await gitService.gitAddAll(localFolderPath)

    await gitService.gitCommit(localFolderPath)

    await gitController.gitPush(namespace, localFolderPath, gitService)
}

const getGitIgnoreFilter = async (localFolderPath: string): Promise<(filepath: string) => boolean> => {
    const gitignoreFilePath = path.join(localFolderPath, '.gitignore')
    if (fs.pathExistsSync(gitignoreFilePath)) {
        const gitignoreContent = await fs.readFile(gitignoreFilePath, 'utf8')
        return gitignoreParser.compile(gitignoreContent).accepts
    }
    return (filepath: string) => true
}

export const codeWatch = async (system: ISystem, serviceName: string, devspaceName: string) => {
    const { uiService, filesService, gitService, localDB } = system
    const localFolderPath = await getRepoPath(serviceName, devspaceName, localDB)
    const interactive = uiService.newInteractive()

    const gitIgnoreFilter: (path: string) => boolean = await getGitIgnoreFilter(localFolderPath)

    const filter = (pathString: string) => {
        const clearedPath = logicPath.clearPath(localFolderPath, pathString)
        return gitIgnoreFilter(clearedPath) && !logicPath.isDotGitFolder(clearedPath)
    }
    const cb = async (evt: string, name: string) => {
        interactive.await(`${evt}: ${name}`)
        await syncFlow(devspaceName, localFolderPath, gitService)
        interactive.success(`${evt}: ${name}`)
    }

    uiService.log('Now watching...')
    filesService.startWatching(localFolderPath, __.debounce(cb, 1000), filter)
}

export const codePush = async (system: ISystem, serviceName: string, watch: boolean) => {
    const { uiService, gitService, configService, localDB, filesService } = system
    const { devspace } = await configService.readConfig()
    const localFolderPath = await getRepoPath(serviceName, devspace.name, localDB)

    // Pushing code
    uiService.spinner.start('Pushing...')
    await syncFlow(devspace.name, localFolderPath, gitService)
    uiService.spinner.succeed('Pushing...')

    // Create mirror .git
    if (!await gitService.alreadyHasMirrorRepo(localFolderPath)) {
        uiService.log('creating file')
        await gitService.createMirrorRepo(localFolderPath)
    }

    if (watch) {
        codeWatch(system, serviceName, devspace.name)
    }
}
