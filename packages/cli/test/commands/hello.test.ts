import {expect, test} from '@oclif/test'

describe('hello', () => {
  test
  .stdout({
    print: true,
  })
  .command(['hello:cmd', '--test'])
  .it('runs hello', (ctx) => {
    expect(1).to.equal(1)
  })
})
