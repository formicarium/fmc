
import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../FMCCommand'
import * as Table from 'tty-table'
import moment from 'moment'
import { IApp, AppStatus } from '@formicarium/common'

const CHECK = '🚀'
const ERROR = '🔴'
const LOADING = '🕒'

export default class ServiceStatus extends FMCCommand {
  public static description = 'Restart a service deployed in dev mode'

  public static examples = [
    `$ fmc service:restart mancini`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
  }

  private isSynced = (app: IApp) => app.lastRemoteCommit === app.lastLocalCommit
  private renderIsSynced = (isSynced: boolean) => isSynced ? CHECK : ERROR
  private renderDate = (date: Date) => moment(date).format('DD/MM/YYYY HH:mm:ss')
  private renderStatus = (status: AppStatus) => {
    switch (status) {
      case AppStatus.CREATING: return LOADING
      case AppStatus.DOWN: return ERROR
      case AppStatus.HEALTHY: return CHECK
    }
  }
  private renderRow = (app: IApp) => {
    return [
      app.name,
      app.version,
      this.renderStatus(app.status),
      this.renderIsSynced(this.isSynced(app)),
      this.renderDate(app.lastRemoteCommitTimestamp),
    ]
  }
  private render = (apps: IApp[]) => {
    const headers = [
      { value: 'Service', width: 30 },
      { value: 'Version', width: 30  },
      { value: 'Status', width: 30  },
      { value: 'Sync', width: 30  },
      { value: 'Last Sync', width: 30  },
    ]
    const columns = apps.map(this.renderRow)

    const table = new Table(headers, columns)
    return table.render()
  }

  public async run() {
    const { soilService, uiService } = this.system

    const response = await soilService.getStatus()
    uiService.log(this.render(response.apps))
  }
}
