import { flags as Flags } from '@oclif/command'
import Table from 'tty-table'
import FMCCommand from '../../FMCCommand'

const NoVersion = undefined

export default class DevspaceUse extends FMCCommand {
  public static description = 'Get information for the current devspace'

  public static examples = [
    `$ fmc devspace:info`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
  }

  public async run() {
    const { soilService, hiveService, tanajuraService, configService, uiService } = this.system
    /*
    * Logging Proggress
    */
    const interactive = uiService.newInteractive()
    let counter = 0
    const N_TASKS = 3
    interactive.await(`Getting Versions... [0/${N_TASKS}]`)
    const increment = (v: any) => {
      counter++
      if (counter === 4) {
        interactive.success(`Getting Versions... [${counter}/${N_TASKS}]`)
      } else {
        interactive.await(`Getting Versions... [${counter}/${N_TASKS}]`)
      }
      return v
    }
    const { devspace: { hiveApiUrl, hiveReplUrl, tanajuraApiUrl, tanajuraGitUrl }, soilUrl } = await configService.readConfig()

    /**
     * Get versions
     */
    const soilVersion = soilService.getVersion().catch(() => NoVersion).then(increment)
    const hiveVersion = hiveService.getVersion().catch(() => NoVersion).then(increment)
    const tanajuraVersion = tanajuraService.getVersion(tanajuraApiUrl).catch(() => NoVersion).then(increment)

    /**
     * Render table
     */
    const headers = [{ value: 'Service' }, { value: 'Version' }, { value: 'URL' }]
    const columns = [
      ['Hive', await hiveVersion, `${hiveApiUrl}\n${hiveReplUrl}`],
      ['Tanajura', await tanajuraVersion, `${tanajuraApiUrl}\n${tanajuraGitUrl}`],
      ['Soil', await soilVersion, soilUrl],
    ]
    const table = new Table(headers, columns)
    uiService.log(table.render())
  }
}
