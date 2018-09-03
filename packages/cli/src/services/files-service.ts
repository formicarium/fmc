import * as watch from 'node-watch'

type ChangedEvent = (evt: string, name: string) => void
export interface IFilesService {
  startWatching: (rootPath: string, cb: ChangedEvent,  filter: any) => Promise<void>
}

const getFilter = (excludeArray: string[]) => (f: string) => !excludeArray.some((regexString) => new RegExp(regexString).test(f))

export class FilesService implements IFilesService {
  public startWatching = async (rootPath: string, cb: ChangedEvent, filter?: any) => {
    watch(rootPath, { recursive: true, filter }, (evt: string, name: string) => {
      console.log(evt, name)
      cb(evt, name)
    })
  }
}
