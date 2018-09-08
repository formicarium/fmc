import { flags as Flags } from '@oclif/command'
import FMCCommand from 'src/FMCCommand'

export default class DevspaceDelete extends FMCCommand {
  public static description = 'Deletes a Devspace'

  public static examples = [
    `$ fmc devspace:delete paps`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
  }

  public static args = [
    { name: 'name', required: true },
  ]

  public async run() {
    const { args } = this.parse(DevspaceDelete)
    const { name } = args
    const { soilService, uiService } = this.system
    if (await uiService.promptBoolean(`Confirm deleting ${name}? (y/n)`)) {
      uiService.warn(`Deleting ${name}...`)
      await soilService.deleteDevspace(name)
      uiService.success('Devspace Deleted')
    } else {
      uiService.info('Aborting Command')
    }
  }
}
