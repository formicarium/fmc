import { IHashMap } from './../typings/common';
export interface IInterface {
  name: string
  container: string
  port: number
  type: string
}

export interface IContainer {
  name: string
  image: string
  syncable?: boolean
  env: IHashMap<string>
}
export interface IApplicationDefinition {
  name: string
  containers: IContainer[]
  interfaces: IInterface[]
}
export interface IApplicationLinks {
  [name: string]: string,
}
export interface IApplication {
  name: string
  devspace: string
  links: IApplicationLinks
}
export interface IDevspace {
  name: string
  hive: IApplication
  tanajura: IApplication
  applications: IApplication[]
}
