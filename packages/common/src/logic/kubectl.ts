import { IPod } from './../typings/pod'
import * as R from 'ramda'
import { Nullable } from '../typings/common'

export const getPodName = (pod: IPod) => pod.metadata.name

export const getContainerPortNumber = (pod: IPod, containerName: string, portName: string): Nullable<number> => {
  const container = R.find((c) => c.name === containerName, pod.spec.containers) || null
  if (!container) { return null }
  const port = R.find((p) => p.name === portName, container.ports) || null
  if (!port) { return null }
  return port.containerPort
}
