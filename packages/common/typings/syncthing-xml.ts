export interface IVersionXML {
  version: string
}

export interface IFolderXML$ {
  id: string
  label: string
  path: string
  type: string
  rescanIntervalS: string
  fsWatcherEnabled: string
  fsWatcherDelayS: string
  ignorePerms: string
  autoNormalize: string
}

export interface IFolderDeviceXML$ {
  id: string
  introducedBy: string
}

export interface IFolderDeviceXML {
  $: IFolderDeviceXML$
}

export interface IMinDiskFree$ {
  unit: string
}

export interface IMinDiskFree {
  _: string
  $: IMinDiskFree$
}

export interface IFolderXML {
  $: IFolderXML$
  filesystemType: string[]
  device: IFolderDeviceXML[]
  minDiskFree: IMinDiskFree[]
  versioning: string[]
  copiers: string[]
  pullerMaxPendingKiB: string[]
  hashers: string[]
  order: string[]
  ignoreDelete: string[]
  scanProgressIntervalS: string[]
  pullerPauseS: string[]
  maxConflicts: string[]
  disableSparseFiles: string[]
  disableTempIndexes: string[]
  paused: string[]
  weakHashThresholdPct: string[]
  markerName: string[]
  useLargeBlocks: string[]
}

export interface IDeviceXML$ {
  id: string
  name: string
  compression: string
  introducer: string
  skipIntroductionRemovals: string
  introducedBy: string
}

export interface IDeviceXML {
  $: IDeviceXML$
  address: string[]
  paused: string[]
  autoAcceptFolders: string[]
  maxSendKbps: string[]
  maxRecvKbps: string[]
}

export interface IGui$ {
  enabled: string
  tls: string
  debugging: string
}

export interface IGuiXML {
  $: IGui$
  address: string[]
  apikey: string[]
  theme: string[]
}

export interface IMinHomeDiskFree$ {
  unit: string
}

export interface IMinHomeDiskFree {
  _: string
  $: IMinHomeDiskFree$
}

export interface IOptionXML {
  listenAddress: string[]
  globalAnnounceServer: string[]
  globalAnnounceEnabled: string[]
  localAnnounceEnabled: string[]
  localAnnouncePort: string[]
  localAnnounceMCAddr: string[]
  maxSendKbps: string[]
  maxRecvKbps: string[]
  reconnectionIntervalS: string[]
  relaysEnabled: string[]
  relayReconnectIntervalM: string[]
  startBrowser: string[]
  natEnabled: string[]
  natLeaseMinutes: string[]
  natRenewalMinutes: string[]
  natTimeoutSeconds: string[]
  urAccepted: string[]
  urSeen: string[]
  urUniqueID: string[]
  urURL: string[]
  urPostInsecurely: string[]
  urInitialDelayS: string[]
  restartOnWakeup: string[]
  autoUpgradeIntervalH: string[]
  upgradeToPreReleases: string[]
  keepTemporariesH: string[]
  cacheIgnoredFiles: string[]
  progressUpdateIntervalS: string[]
  limitBandwidthInLan: string[]
  minHomeDiskFree: IMinHomeDiskFree[]
  releasesURL: string[]
  overwriteRemoteDeviceNamesOnConnect: string[]
  tempIndexMinBlocks: string[]
  trafficClass: string[]
  defaultFolderPath: string[]
  setLowPriority: string[]
  minHomeDiskFreePct: string[]
}

export interface IConfigurationXML {
  folder: IFolderXML[]
  device: IDeviceXML[]
  gui: IGuiXML[]
  options: IOptionXML[]
  ignoredFolder: string[]
}

export interface ISyncthingConfigXML {
  configuration: IConfigurationXML
}
