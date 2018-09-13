import { IPod, IResponse } from './../model/pod'
import { exec } from 'child-process-promise'
import { spawn, ChildProcess, SpawnOptions } from 'child_process'
import { Nullable } from '../utils'

export interface IMinMajor {
  minor: string
  major: string
}
export interface IKubectlVersion {
  clientVersion: IMinMajor
  serverVersion: IMinMajor
}

export interface ICommandAndArgs {
  command: string
  args?: string[]
}

const joinCommandAndArgs = ({
  command,
  args,
}: ICommandAndArgs) => {
  if (args) {
    return `${command} ${args.join(' ')}`
  }
  return command
}

const DEFAULT_TAIL_SIZE = 100

const scripts = (command: string = 'kubectl') => ({
  searchPodsByLabel: (label: string, namespace: string): ICommandAndArgs => ({
    command,
    args: ['get', 'pod', '-l', `app="${label}"`, '-o', 'json', '-n', namespace],
  }),
  forward: (podName: string, localPort: number, containerPort: number, namespace: string): ICommandAndArgs => ({
    command,
    args: ['port-forward', podName, `"${localPort}":"${containerPort}"`, '-n', namespace],
  }),
  logs: (podName: string, namespace: string): ICommandAndArgs => ({
    command,
    args: ['logs', podName, '-n', namespace, '-f', '--tail', `${DEFAULT_TAIL_SIZE}`],
  }),
  version: (): ICommandAndArgs => ({
    command,
    args: ['version', '-o', 'json'],
  }),
})

const execAndParseJson = <T>(commandAndArgs: ICommandAndArgs): Promise<T> => exec(joinCommandAndArgs(commandAndArgs))
  .then((result) => result.stdout)
  .then((stdout) => JSON.parse(stdout))

const spawnCommandAndArgs = (commandAndArgs: ICommandAndArgs, options?: SpawnOptions): ChildProcess => spawn(
  commandAndArgs.command,
  commandAndArgs.args,
  options,
)

export interface IKubectlServiceOptions {
  bin?: string
}
export interface IKubectlService {
  getPodByLabel: (namespace: string, label: string, options?: IKubectlServiceOptions) => Promise<Nullable<IPod>>
  streamLogs: (namespace: string, label: string, options?: IKubectlServiceOptions) => ChildProcess
  portForward: (namespace: string, podName: string, localPort: number, containerPort: number, options?: IKubectlServiceOptions) => ChildProcess
  version: (options?: IKubectlServiceOptions) => Promise<IKubectlVersion>
}
export class KubectlService implements IKubectlService {
  public getPodByLabel = (namespace: string, label: string, options: IKubectlServiceOptions = {}): Promise<Nullable<IPod>> => {
    return execAndParseJson<IResponse>(scripts(options.bin).searchPodsByLabel(label, namespace))
    .then((response) => response.items[0])
  }

  public streamLogs = (namespace: string, podName: string, options: IKubectlServiceOptions = {}): ChildProcess => {
    return spawnCommandAndArgs(scripts(options.bin).logs(podName, namespace))
  }

  public portForward = (namespace: string, podName: string, localPort: number, containerPort: number, options: IKubectlServiceOptions = {}): ChildProcess => {
    return spawnCommandAndArgs(scripts(options.bin).forward(podName, localPort, containerPort, namespace))
  }

  public version = (options: IKubectlServiceOptions = {}): Promise<IKubectlVersion> => {
    return execAndParseJson(scripts(options.bin).version())
  }
}
