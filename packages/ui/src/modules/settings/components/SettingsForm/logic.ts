import { ISettingsForm } from '~/modules/settings/components/SettingsForm';
import { IMinMajor, Nullable, IKubectlVersion } from '@formicarium/common';
import compareVersions from 'compare-versions'

export const minMajorToSemanticString = (minMajor: IMinMajor) => minMajor ? `${minMajor.major}.${minMajor.minor}.0` : '0.0.0'
export const MIN_KUBECTL_VERSION: IMinMajor = {
  major: '1',
  minor: '9'
}

export const compareMinMajor = (minMajorA: IMinMajor, minMajorB: IMinMajor) => compareVersions(
  minMajorToSemanticString(minMajorA),
  minMajorToSemanticString(minMajorB)
)

const shouldUpdateLastObtainedVersion = (lastObtainedVersion: Nullable<IKubectlVersion>, newObtainedVersion: IKubectlVersion): boolean => {
  if (!lastObtainedVersion) {
    return true
  }
  return compareMinMajor(lastObtainedVersion.clientVersion, newObtainedVersion.clientVersion) !== 0
}

export const validateKubectlBin = (
  getVersionForKubectlBin: ISettingsForm['getVersionForKubectlBin'],
  lastObtainedVersion: ISettingsForm['lastObtainedVersion'],
  setLastObtainedVersion: ISettingsForm['setLastObtainedVersion'],
) => async (value: string) => {
  try {
    const version = await getVersionForKubectlBin(value)
    if (shouldUpdateLastObtainedVersion(lastObtainedVersion, version)) {
      setLastObtainedVersion(version)
    }

    if (compareMinMajor(version.clientVersion, MIN_KUBECTL_VERSION) === -1) {
      const { major, minor } = MIN_KUBECTL_VERSION
      return `Version needs to be greater than ${major}.${minor}`
    }
  } catch (err) {
    return 'Invalid bin!'
  }
}
