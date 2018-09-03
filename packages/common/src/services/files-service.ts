import * as watch from 'node-watch'
import * as fs from 'fs-extra'

type ChangedEvent = (evt: string, name: string) => void

export interface IFilesService {
  startWatching: (rootPath: string, cb: ChangedEvent,  filter: any) => Promise<void>
  safelyReadJSON: <T>(filePath: string) => Promise<T>
}

export class FilesService implements IFilesService {
  public startWatching = async (rootPath: string, cb: ChangedEvent, filter?: any) => {
    watch(rootPath, { recursive: true, filter }, (evt: string, name: string) => {
      console.log(evt, name)
      cb(evt, name)
    })
  }
  
  public safelyReadJSON = async <T>(filePath: string): Promise<T> => {
    const fileExists = await fs.pathExists(filePath)
    if (!fileExists) {
      throw new Error(`File ${filePath} does not exist`)
    }
    const fileContent = await fs.readJson(filePath) as T
    return fileContent
  }
}
