import {expect, test} from '@oclif/test'
import assert from 'assert'
import * as logicPath from '../../src/logic/path'

describe('logic.path', () => {
  describe('#clearSlash', () => {
    it('should remove first character when its /', () => {
      assert(logicPath.clearSlash('/foo/bar') === 'foo/bar')
    })

    it('should not remove first character when its not /', () => {
      assert(logicPath.clearSlash('foo/bar') === 'foo/bar')
    })
  })

  describe('#removeSubpathFromPath', () => {
    it('should remove subpath', () => {
      assert.equal(logicPath.removeSubpathFromPath('sub/path', 'sub/path/to/stuff'), '/to/stuff')
    })
  })

  describe('#isDotGitFolder', () => {
    it('should return true when its .git', () => {
      assert.equal(logicPath.isDotGitFolder('.git'), true)
    })

    it('should return true when its .fmcgit', () => {
      assert.equal(logicPath.isDotGitFolder('.fmcgit'), true)
    })

    it('should return false otherwise', () => {
      assert.equal(logicPath.isDotGitFolder('.idea'), false)
    })
  })
})
