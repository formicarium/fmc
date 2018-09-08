import { HelloCommand } from 'commands/hello/cmd'

describe('devspace:create', () => {
  it('works', async () => {
    await HelloCommand.run([])
  })
})
