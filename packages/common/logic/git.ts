import { RemoteWithRefs } from 'simple-git/response'

export const getTanajuraGitUrl = (tanajuraGitUrl: string, service: string) => {
  return `${tanajuraGitUrl}/${service}.git`
}

export const getTanajuraRemoteName = (namespace: string) => {
  return `${namespace}-fmc`
}

export const isTanajuraAlreadyInRemotes = (remotes: RemoteWithRefs[], namespace: string) => {
  return remotes.some((remote) => remote.name === getTanajuraRemoteName(namespace))
}

export const areRemotesEqual = (remotes: RemoteWithRefs[], remoteName: string, remoteUrl: string) => {
  const remote = remotes.find((r) => r.name === remoteName)
  if (!remote) {
    return false
  }
  return remote.refs.push === remoteUrl
}
