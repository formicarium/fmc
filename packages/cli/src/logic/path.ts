import * as R from 'ramda'
import * as __ from 'lodash'

export const removeSubpathFromPath = (subpath: string, pathString: string) => pathString.replace(subpath, '')

export const clearSlash = (pathString: string) => {
  const [firstChar, ...rest] = pathString
  return (firstChar === '/') ? rest.join('') : pathString
}

export const isDotGitFolder = (x: string) => /\.git|\.fmcgit/.test(x)

export const clearPath = R.compose(clearSlash, removeSubpathFromPath)
