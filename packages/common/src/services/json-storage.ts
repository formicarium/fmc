export interface IJSONStorage {
  get: <T extends {}>(key: string) => Promise<T>
  set: <T extends {}>(key: string, value: T) => Promise<void>
  delete: (key: string) => Promise<void>
}
