import { exec, spawn } from 'child-process-promise'
import * as path from 'path'
import { IResponse, IPod } from '../../typings/pod'
import { ChildProcess } from 'child_process'

const scriptsRoot = path.join(__dirname, 'scripts')

const scripts = {
  searchPodsByLabel: path.join(scriptsRoot, 'search-pods-by-label'),
  forward: path.join(scriptsRoot, 'forward'),
  cp: path.join(scriptsRoot, 'cp'),
  cpWatch: path.join(scriptsRoot, 'cp-watch'),
}

const execAndParseJson = <T>(scriptPath: string): Promise<T> => exec(scriptPath)
  .then((result) => result.stdout)
  .then((stdout) => JSON.parse(stdout))

export const getPodByLabel = ({namespace, label}: { namespace: string, label: string}): Promise<IPod> => {
  return execAndParseJson<IResponse>(`${scripts.searchPodsByLabel} ${namespace} ${label}`)
    .then((response) => response.items[0])
}

export interface IStartPortForwardOptions {
  namespace: string,
  podName: string
  localPort: number,
  containerPort: number
}
export const startPortForward = ({ namespace, podName, localPort, containerPort }: IStartPortForwardOptions): ChildProcess => {
  return spawn(scripts.forward, [namespace, podName, localPort, containerPort].map(String)).childProcess
}

export interface IKubeCpOptions {
  namespace: string
  podName: string
  podFolder: string
  localFolder: string
}
export const cpWatch = ({ namespace, podName, podFolder, localFolder }: IKubeCpOptions): ChildProcess => {
  return spawn(scripts.cpWatch, [namespace, podName, podFolder, localFolder]).childProcess
}
