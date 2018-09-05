import { Container } from 'unstated';
import { v4 } from 'uuid'
import { IHashMap } from 'common';

export interface ISyncedFile {
  path: string
  timestamp: number
}

export interface ISync {
  id: string
  devspace: string
  applicationName: string
  folder: string
  syncedFiles: ISyncedFile[]
}

export interface ISyncState {
  syncs: ISync[]
}

export class SyncState extends Container<ISyncState> {
  constructor() {
    super()
    this.state = {
      syncs: [],
    }
  }

  public startSyncing = (devspace: string, applicationName: string, folder: string) => {
    const id = v4()
    this.setState((state) => ({
      syncs: [
        ...state.syncs, {
          id,
          devspace,
          applicationName,
          folder,
          syncedFiles: [],
        },
      ],
    }))

    return id
  }

  public stopSyncing = (id: string) => {
    this.setState((state) => ({
      syncs: state.syncs.filter((sync) => sync.id !== id),
    }))
  }

  public getApplicationsSyncing = (): IHashMap<boolean> => {
    return this.state.syncs.reduce((acc, sync) => ({
      ...acc,
      [sync.applicationName]: true,
    }), {})
  }
}
