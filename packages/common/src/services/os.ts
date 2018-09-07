import * as ps from 'ps-node'
import * as os from 'os'
import { spawn, SpawnOptions } from 'child_process'
import * as getPort from 'get-port'

export interface IProcessDescription {
  pid: string
  command: string,
  arguments: string[],
  ppid: string
}

export const spawnWithOutput = (command: string, args?: ReadonlyArray<string>, options?: SpawnOptions): Promise<number> => {
  return new Promise((resolve, reject) => {
    const p = spawn(command, args, options)
    p.stdout.setEncoding('utf8')
    p.stderr.setEncoding('utf8')

    p.stdout.on('data', console.log)
    p.stderr.on('data', console.log)

    p.on('close', (code) => {
      if (code === 0) {
        resolve(code)
        return
      }
      reject(code)
    })
  })
}

export const isProcessRunning = (name: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    ps.lookup({
      command: name,
    }, (err: any, resultList: IProcessDescription[]) => {
      if (err) {
        reject(err)
        return
      }

      resolve(resultList && resultList.length > 0)
    })
  })

}

export const checkIfBrewPackageIsInstalled = (packageName: string) => {
  return new Promise((resolve, reject) => {
    const p = spawn('brew', ['ls', '--versions', packageName])
    p.on('close', (code: number) => {
      resolve(code === 0)
    })
    p.on('error', reject)
  })
}

export const getLocalMachineIdentifier = () => `${os.userInfo().username}@${os.hostname()}`

export const getFreePort = (preferred?: number): Promise<number> => getPort({port: preferred}) as Promise<number>
