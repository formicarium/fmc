import { IJSONStorage } from './json-storage'
import * as storage from 'electron-json-storage'

export class ElectronJsonStorage implements IJSONStorage {
  public get<T extends {}>(key: string): Promise<T> {
    return new Promise((resolve, reject) => {
      storage.get(key, (err, data: T) => {
        if (err) {
          reject(err)
          return
        }
        resolve(data)
      })
    })
  }

  public set<T extends {}>(key: string, value: T): Promise<void> {
    return new Promise((resolve, reject) => {
      storage.set(key, value, (err) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })
  }

  public delete(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      storage.remove(key, (err) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })
  }
}
