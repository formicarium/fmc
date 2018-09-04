import { exec, spawn as spawnPromise } from 'child-process-promise'
import * as path from 'path'
import { IResponse, IPod } from '../../typings/pod'
import { spawn, ChildProcess } from 'child_process'
import { Nullable } from '../../typings';

const scriptsRoot = path.join(__dirname, 'scripts')

const scripts = {
  searchPodsByLabel: path.join(scriptsRoot, 'search-pods-by-label'),
  forward: path.join(scriptsRoot, 'forward'),
  cp: path.join(scriptsRoot, 'cp'),
  cpWatch: path.join(scriptsRoot, 'cp-watch'),
  logs: path.join(scriptsRoot, 'logs'),
}

const execAndParseJson = <T>(scriptPath: string): Promise<T> => exec(scriptPath)
  .then((result) => result.stdout)
  .then((stdout) => JSON.parse(stdout))

export interface IStartPortForwardOptions {
  namespace: string,
  podName: string
  localPort: number,
  containerPort: number
}
export const startPortForward = ({ namespace, podName, localPort, containerPort }: IStartPortForwardOptions): ChildProcess => {
  return spawnPromise(scripts.forward, [namespace, podName, localPort, containerPort].map(String)).childProcess
}

export interface IKubeCpOptions {
  namespace: string
  podName: string
  podFolder: string
  localFolder: string
}
export const cpWatch = ({ namespace, podName, podFolder, localFolder }: IKubeCpOptions): ChildProcess => {
  return spawnPromise(scripts.cpWatch, [namespace, podName, podFolder, localFolder]).childProcess
}

export interface IKubectlService {
  getPodByLabel: (namespace: string, label: string) => Promise<Nullable<IPod>>
  streamLogs: (namespace: string, label: string) => ChildProcess
}
export class KubectlService implements IKubectlService {
  public getPodByLabel = (namespace: string, label: string): Promise<Nullable<IPod>> => {
    return execAndParseJson<IResponse>(`${scripts.searchPodsByLabel} ${namespace} ${label}`)
    .then((response) => response.items[0])
  }

  public streamLogs = (namespace: string, podName: string): ChildProcess => {
    const childProcess = spawn(scripts.logs, [namespace, podName])
    return childProcess
  }
}
