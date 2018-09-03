export interface IDevice {
  addresses: string[]
  compression?: string
  deviceID: string
  introducer?: boolean
  name: string
  selectedFolders?: {
    default: boolean,
  }
  certName?: string,
}

export interface IGUI {
  enabled: boolean,
  address: string,
  user: string,
  password: string,
  useTLS: boolean,
  apiKey: string,
  insecureAdminAccess: boolean,
  theme: string,
}

export interface IOptions {
  listenAddresses: string[]
  globalAnnounceServers: string[]
  globalAnnounceEnabled: boolean,
  localAnnounceEnabled: boolean,
  localAnnouncePort: number,
  localAnnounceMCAddr: string,
  maxSendKbps: number,
  maxRecvKbps: number,
  reconnectionIntervalS: number,
  relaysEnabled: boolean,
  relayReconnectIntervalM: number,
  startBrowser: boolean,
  natEnabled: boolean,
  natLeaseMinutes: number,
  natRenewalMinutes: number,
  natTimeoutSeconds: number,
  urAccepted: number,
  urUniqueId: string,
  urURL: string,
  urPostInsecurely: boolean,
  urInitialDelayS: number,
  restartOnWakeup: boolean,
  autoUpgradeIntervalH: number,
  keepTemporariesH: number,
  cacheIgnoredFiles: boolean,
  progressUpdateIntervalS: number,
  limitBandwidthInLan: boolean,
  minHomeDiskFreePct: number,
  releasesURL: string,
  alwaysLocalNets: string[],
  overwriteRemoteDeviceNamesOnConnect: boolean,
  tempIndexMinBlocks: number,
}

export interface IFolder {
  id: string
  label?: string,
  path: string,
  type?: 'readonly' | 'readwrite',
  devices?: Array<Pick<IDevice, 'deviceID'>>,
  rescanIntervalS?: number,
  ignorePerms?: boolean,
  autoNormalize?: boolean,
  minDiskFreePct?: number,
  versioning?: {
    type: string,
    params: {
      keep: string,
    },
  },
  copiers?: number,
  pullers?: number,
  hashers?: number,
  order?: string,
  ignoreDelete?: boolean,
  scanProgressIntervalS?: number,
  pullerSleepS?: number,
  pullerPauseS?: number,
  maxConflicts?: number,
  disableSparseFiles?: boolean,
  disableTempIndexes?: boolean,
  fsync?: boolean,
  invalid?: string,
  fsWatcherEnabled?: boolean
  fsWatcherDelayS?: number
}
export interface ISyncthingConfig {
  version: number
  folders: IFolder[],
  devices: IDevice[],
  gui: IGUI,
  options: IOptions
  ignoredDevices: IDevice[]
}
