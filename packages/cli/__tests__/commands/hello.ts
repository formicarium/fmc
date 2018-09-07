import HelloCommand from '../../src/commands/hello/cmd'

describe('commands:hello', () => {
  it('works', () => {
    const r = HelloCommand.run(['--test'])
  })
})
