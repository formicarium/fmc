
import * as R from 'ramda'
import { IPod } from '../model/pod'
import { Nullable } from '../utils/types'

export const getPodName = (pod: IPod) => pod.metadata.name

export const getContainerPortNumber = (pod: IPod, containerName: string, portName: string): Nullable<number> => {
  const container = R.find((c) => c.name === containerName, pod.spec.containers) || null
  if (!container) { return null }
  const port = R.find((p) => p.name === portName, container.ports) || null
  if (!port) { return null }
  return port.containerPort
}
