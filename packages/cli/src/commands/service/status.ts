
import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../FMCCommand'
import Table from 'tty-table'
import moment from 'moment'
import { IApp, AppStatus } from '@formicarium/common'
import { IOutputFlags } from '../../services/output'

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
    return {
      name: app.name,
      version: app.version,
      status: this.renderStatus(app.status),
      sync: this.renderIsSynced(this.isSynced(app)),
      date: this.renderDate(app.lastRemoteCommitTimestamp),
    }
  }

  public async run() {
    const { soilService, uiService, outputService} = this.system
    const { flags } = this.parse(ServiceStatus)
    const response = await soilService.getStatus()

    outputService.put(response.apps.map(this.renderRow), flags as IOutputFlags)
  }
}
