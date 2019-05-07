import { RemoteWithRefs } from 'simple-git/response'
import gitP from 'simple-git/promise'
import moment from 'moment'
import * as fs from 'fs-extra'
import * as path from 'path'

type SimpleGitGetter = (basePath?: string) => gitP.SimpleGit

const FMC_GIT_AUTHOR = 'formigao'
const FMC_GIT_EMAIL = 'fmc@example.com'
const SKIP_TOKEN = '[skip-pull]'

export interface IGitService {
  addRemote: (basePath: string, name: string, url: string) => Promise<any>
  push: (basePath: string, remote: string, branch: string) => Promise<void>
  getRemotes: (basePath: string) => Promise<RemoteWithRefs[]>
  removeRemote: (basePath: string, remoteName: string) => Promise<void>
  checkIfRepo: (basePath: string) => Promise<boolean>
  deleteRepo: (basePath: string) => Promise<void>
  gitAddAll: (basePath: string) => Promise<void>
  gitCommit: (basePath: string, skipPull?: boolean) => Promise<gitP.CommitSummary>
  createMirrorRepo: (basePath: string) => Promise<void>
  alreadyHasMirrorRepo: (basePath: string) => Promise<boolean>
}

export class GitService implements IGitService {
  private static ORIGINAL_GIT_FOLDER = '.git'
  private static MIRROR_GIT_FOLDER = '.fmcgit'

  private simpleGit: SimpleGitGetter

  constructor() {
    this.simpleGit = gitP as any
  }

  private getGit = (basePath: string, log: boolean = false) => {
    return this.simpleGit(basePath)
      .env('GIT_DIR', GitService.MIRROR_GIT_FOLDER)
      .env('GIT_WORK_TREE', basePath)
      .env('HOME', process.env.HOME || '')
  }

  public addRemote = (basePath: string, name: string, url: string): Promise<any> => {
    return this.getGit(basePath).addRemote(name, url)
  }

  public push = async (basePath: string, remote: string, branch: string): Promise<void> => {
    const git = this.getGit(basePath, true)
    const currentBranch = await git.branchLocal().then(((bs) => bs.current))
    return git.push(remote, `${currentBranch}:${branch}`, { '-f': null })
  }

  public getRemotes = async (basePath: string): Promise<RemoteWithRefs[]> => {
    return this.getGit(basePath).getRemotes(true) as any
  }

  public removeRemote = async (basePath: string, remoteName: string): Promise<void> => {
    return this.getGit(basePath).removeRemote(remoteName)
  }
  public checkIfRepo = async (basePath: string): Promise<boolean> => {
    return this.getGit(basePath).checkIsRepo()
  }

  private getCommitMessage = (skip?: boolean) => {
    const dateString = moment().format('DD/MM/YYYY HH:mm:ss')
    if (skip) {
      return `${dateString} ${SKIP_TOKEN}`
    }

    return `${dateString}`
  }

  private getMirrorGitRepoPath = (basePath: string) => path.join(basePath, GitService.MIRROR_GIT_FOLDER)
  private getExcludeFilePath = (basePath: string, gitFolder: string) => path.join(basePath, gitFolder, 'info', 'exclude')

  public gitAddAll = async (basePath: string): Promise<void> => {
    return this.getGit(basePath).add(['.'])
  }

  public gitCommit = async (basePath: string, skipPull?: boolean): Promise<gitP.CommitSummary> => {
    return this.getGit(basePath)
      .commit(this.getCommitMessage(skipPull), undefined, {
        '--allow-empty': true,
        '--author': `${FMC_GIT_AUTHOR} <${FMC_GIT_EMAIL}>`,
      })
  }

  private hasAlreadyExcluded = (lines: string[]) => !!lines.find((line) => line === GitService.MIRROR_GIT_FOLDER)
  private addExclude = (lines: string[]) => [...lines, GitService.MIRROR_GIT_FOLDER]
  private linesToFile = (lines: string[]) => lines.join('\n')
  private fileToLines = (content: string) => content.split('\n')

  private safelyAddExcludeToGit = async (basePath: string, gitFolder: string) => {
    const filePath = this.getExcludeFilePath(basePath, gitFolder)
    if (!await fs.pathExists(filePath)) {
      return
    }
    const fileContent = await fs.readFile(filePath, 'utf8')
    const lines = this.fileToLines(fileContent)
    const newLines = this.hasAlreadyExcluded(lines) ? lines : this.addExclude(lines)
    if (lines.length !== newLines.length) {
      await fs.writeFile(this.getExcludeFilePath(basePath, gitFolder), this.linesToFile(newLines))
    }
  }

  public createMirrorRepo = async (basePath: string): Promise<void> => {
    await this.getGit(basePath).init(false)
    await this.safelyAddExcludeToGit(basePath, GitService.ORIGINAL_GIT_FOLDER)
    await this.safelyAddExcludeToGit(basePath, GitService.MIRROR_GIT_FOLDER)
    await this.gitAddAll(basePath)
    await this.gitCommit(basePath, true)
  }

  public alreadyHasMirrorRepo = async (basePath: string): Promise<boolean> => fs.pathExists(this.getMirrorGitRepoPath(basePath))

  public deleteRepo = async (basePath: string): Promise<void> => {
    const gitpath = `${basePath}/${GitService.MIRROR_GIT_FOLDER}`
    fs.removeSync(gitpath)
  }
}
