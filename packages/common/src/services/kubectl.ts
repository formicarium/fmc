import { IPod, IResponse } from './../model/pod'
import { exec } from 'child-process-promise'
import { spawn, ChildProcess, SpawnOptions } from 'child_process'
import { Nullable } from '../utils'
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

const scripts = {
  searchPodsByLabel: (label: string, namespace: string): ICommandAndArgs => ({
    command: 'kubectl',
    args: ['get', 'pod', '-l', `app="${label}"`, '-o', 'json', '-n', namespace],
  }),
  forward: (podName: string, localPort: number, containerPort: number, namespace: string): ICommandAndArgs => ({
    command: 'kubectl',
    args: ['port-forward', podName, `"${localPort}":"${containerPort}"`, '-n', namespace],
  }),
  logs: (podName: string, namespace: string): ICommandAndArgs => ({
    command: 'kubectl',
    args: ['logs', podName, '-n', namespace, '-f'],
  }),
}

const execAndParseJson = <T>(commandAndArgs: ICommandAndArgs): Promise<T> => exec(joinCommandAndArgs(commandAndArgs))
  .then((result) => result.stdout)
  .then((stdout) => JSON.parse(stdout))

const spawnCommandAndArgs = (commandAndArgs: ICommandAndArgs, options?: SpawnOptions): ChildProcess => spawn(
  commandAndArgs.command,
  commandAndArgs.args,
  options,
)
export interface IKubectlService {
  getPodByLabel: (namespace: string, label: string) => Promise<Nullable<IPod>>
  streamLogs: (namespace: string, label: string) => ChildProcess
  portForward: (namespace: string, podName: string, localPort: number, containerPort: number) => ChildProcess
}
export class KubectlService implements IKubectlService {
  public getPodByLabel = (namespace: string, label: string): Promise<Nullable<IPod>> => {
    return execAndParseJson<IResponse>(scripts.searchPodsByLabel(label, namespace))
    .then((response) => response.items[0])
  }

  public streamLogs = (namespace: string, podName: string): ChildProcess => {
    return spawnCommandAndArgs(scripts.logs(podName, namespace))
  }

  public portForward = (namespace: string, podName: string, localPort: number, containerPort: number): ChildProcess => {
    return spawnCommandAndArgs(scripts.forward(podName, localPort, containerPort, namespace))
  }
}
