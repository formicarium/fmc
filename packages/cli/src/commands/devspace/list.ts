import { flags as Flags } from '@oclif/command'
import Table from 'tty-table'
import cli from 'cli-ux'
import FMCCommand from '../../FMCCommand'
import {IOutputFlags} from '../../services/output'

interface IDevspaceListRow {
  name: string,
  hive: string,
  git: string
}

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
    const { uiService, configService, soilService, outputService } = this.system
    const { devspace: selectedDevspace } = await configService.readConfig()
    const {flags} = this.parse(DevspaceList)
    const devspaces = await soilService.getDevspaces()

    const columns = devspaces.map((devspace) => {
      const check = selectedDevspace && selectedDevspace.name === devspace.name ? '*' : ' '
      return {
        name: `${check} ${devspace.name}`,
        hive: devspace.hive.links.default,
        git: devspace.tanajura.links.git,
      } as IDevspaceListRow
    })
    outputService.put(columns, flags as IOutputFlags)
  }
}
