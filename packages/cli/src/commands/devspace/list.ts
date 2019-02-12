import { flags as Flags } from '@oclif/command'
import Table from 'tty-table'
import FMCCommand from '../../FMCCommand'
export default class DevspaceList extends FMCCommand {
  public static description = 'List availables Devspaces'

  public static examples = [
    `$ fmc devspace:list`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
  }

  public async run() {
    const { uiService, configService, soilService } = this.system
    const { devspace: selectedDevspace } = await configService.readConfig()
    const devspaces = await soilService.getDevspaces()
    const header = [{ value: 'Name' }, { value: 'Hive' }, { value: 'Git' }]
    const columns = devspaces.map((devspace) => {
      const check = selectedDevspace && selectedDevspace.name === devspace.name ? ' ☑️ ' : ''
      return [`${check} ${devspace.name}`, devspace.hive.links.default, devspace.tanajura.links.git]
    })

    const table = new Table(header, columns)
    uiService.log(table.render())
  }
}
