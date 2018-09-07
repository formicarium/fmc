interface IHashMap<T> {
  [key: string]: T,
}
type IAnnotations = IHashMap<string>

export interface ILabels {
  app: string
  release: string
}

export interface IOwnerReference {
  apiVersion: string
  blockOwnerDeletion: boolean
  controller: boolean
  kind: string
  name: string
  uid: string
}

export interface IMetadata {
  annotations: IAnnotations
  creationTimestamp: Date
  generateName: string
  labels: ILabels
  name: string
  namespace: string
  ownerReferences: IOwnerReference[]
  resourceVersion: string
  selfLink: string
  uid: string
}

export interface ISecretKeyRef {
  key: string
  name: string
}

export interface IValueFrom {
  secretKeyRef: ISecretKeyRef
}

export interface IEnv {
  name: string
  value: string
  valueFrom: IValueFrom
}

export interface IPort {
  containerPort: number
  name: string
  protocol: string
}

export type IResources = IHashMap<string>

export interface IVolumeMount {
  mountPath: string
  name: string
  readOnly: boolean
}

export interface IContainer {
  env: IEnv[]
  image: string
  imagePullPolicy: string
  name: string
  ports: IPort[]
  resources: IResources
  terminationMessagePath: string
  terminationMessagePolicy: string
  volumeMounts: IVolumeMount[]
}

export type ISecurityContext = IHashMap<string>

export interface IToleration {
  effect: string
  key: string
  operator: string
  tolerationSeconds: number
}

export interface ISecret {
  defaultMode: number
  secretName: string
}

export interface IVolume {
  name: string
  secret: ISecret
}

export interface ISpec {
  containers: IContainer[]
  dnsPolicy: string
  nodeName: string
  restartPolicy: string
  schedulerName: string
  securityContext: ISecurityContext
  serviceAccount: string
  serviceAccountName: string
  terminationGracePeriodSeconds: number
  tolerations: IToleration[]
  volumes: IVolume[]
}

export interface ICondition {
  lastProbeTime?: any
  lastTransitionTime: Date
  status: string
  type: string
}

export interface IRunning {
  startedAt: Date
}

export interface IState {
  running: IRunning
}

export interface IContainerStatus {
  containerID: string
  image: string
  imageID: string
  lastState: object
  name: string
  ready: boolean
  restartCount: number
  state: IState
}

export interface IStatus {
  conditions: ICondition[]
  containerStatuses: IContainerStatus[]
  hostIP: string
  phase: string
  podIP: string
  qosClass: string
  startTime: Date
}

export interface IPod {
  apiVersion: string
  kind: string
  metadata: IMetadata
  spec: ISpec
  status: IStatus
}

export interface IResponseMetadata {
  resourceVersion: string
  selfLink: string
}

export interface IResponse {
  apiVersion: string
  items: IPod[]
  kind: string
  metadata: IResponseMetadata
}
