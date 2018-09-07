import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../FMCCommand'
import { createDevspace } from '../../controllers/devspace'

export default class DevspaceCreate extends FMCCommand {
  public static description = 'Creates a Devspace'

  public static examples = [
    `$ fmc devspace:create paps`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
  }

  public static args = [
    { name: 'id', required: true },
  ]

  public async run() {
    const { localDB, uiService } = this.system
    const { args } = this.parse(DevspaceCreate)
    const { id } = args

    uiService.spinner.start(`Creating namespace ${id}`)
    const respose = await createDevspace(id, this.system)
    await localDB.registerDevspace(id)
    uiService.spinner.succeed()
  }
}
