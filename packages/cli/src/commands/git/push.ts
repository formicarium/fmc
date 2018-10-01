import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../FMCCommand'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as gitignoreParser from 'gitignore-parser'
import * as R from 'ramda'
import * as __ from 'lodash'
import { gitPush } from '../../controllers/git'
import { LocalDB, IGitService } from '@formicarium/common'

const removeSubpathFromPath = (subpath: string, pathString: string) => pathString.replace(subpath, '')
const clearSlash = (pathString: string) => {
  const [firstChar, ...rest] = pathString
  return (firstChar === '/') ? rest.join('') : pathString
}
const baseRegexTest = (x: string) => !/\.git|\.fmcgit/.test(x)
const clearPath = R.compose(clearSlash, removeSubpathFromPath)

export default class GitPush extends FMCCommand {
  public static description = 'Configures local fmcgit and hive'

  public static examples = [
    `$ fmc git:push`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
    watch: Flags.boolean({ char: 'w' }),
  }
  public static args = [
    { name: 'serviceName' },
  ]

  private getRepoPath = async (serviceName: string, namespace: string, localDB: LocalDB): Promise<string> => {
    if (!serviceName) {
      return process.cwd()
    }

    const service = await localDB.getService(namespace, serviceName)

    if (!service) {
      throw new Error(`${serviceName} in ${namespace} not found`)
    }

    return service.repoPath
  }

  private syncFlow = async (namespace: string, localFolderPath: string, gitService: IGitService) => {
    // Add in mirror .git
    await gitService.gitAddAll(localFolderPath)

    // Commit in mirror .git
    await gitService.gitCommit(localFolderPath)

    // Push
    await gitPush(namespace, localFolderPath, gitService)
  }
  public async run() {
    const { uiService, gitService, configService, localDB, filesService } = this.system
    const { args, flags } = this.parse(GitPush)
    const { serviceName } = args
    const { watch } = flags

    const { devspace } = await configService.readConfig()
    const namespace = devspace.name

    const localFolderPath = await this.getRepoPath(serviceName, namespace, localDB)

    uiService.spinner.start('Pushing...')
    await this.syncFlow(namespace, localFolderPath, gitService)
    uiService.spinner.succeed('Pushing...')

    // Create mirror .git
    if (!await gitService.alreadyHasMirrorRepo(localFolderPath)) {
      uiService.log('creating file')
      await gitService.createMirrorRepo(localFolderPath)
    }

    const interactive = uiService.newInteractive()
    if (watch) {
      const gitignoreFilePath = path.join(localFolderPath, '.gitignore')

      let gitignoreFilter = {
        accepts: R.always(true),
      }

      if (fs.pathExistsSync(gitignoreFilePath)) {
        uiService.info('Using .gitignore')
        const gitignoreContent = await fs.readFile(gitignoreFilePath, 'utf8')
        gitignoreFilter = gitignoreParser.compile(gitignoreContent)
      }

      const filter = (pathString: string) => {
        const clearedPath = clearPath(localFolderPath, pathString)
        return [gitignoreFilter.accepts, baseRegexTest].every((f) => f(clearedPath))
      }
      const cb = async (evt: string, name: string) => {
        interactive.await(`${evt}: ${name}`)
        await this.syncFlow(namespace, localFolderPath, gitService)
        interactive.success(`${evt}: ${name}`)
      }

      uiService.log('Now watching...')
      filesService.startWatching(localFolderPath, __.debounce(cb, 1000), filter)
    }
  }
}
