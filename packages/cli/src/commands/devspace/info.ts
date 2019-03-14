import { flags as Flags } from '@oclif/command'
import Table from 'tty-table'
import FMCCommand from '../../FMCCommand'
import { string } from '@oclif/command/lib/flags'
import { IOutputFlags } from '../../services/output'

const NoVersion = undefined
export interface IDevspaceInfoOutput {
  service: string,
  version: string,
  url: string[]
}
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
    const { soilService, hiveService, tanajuraService, configService, uiService, outputService } = this.system
    const { flags } = this.parse(DevspaceUse)
    /*
    * Logging Proggress
    */
    const interactive = uiService.newInteractive()
    let counter = 0
    const N_TASKS = 3
    interactive.await(`Getting Versions... [0/${N_TASKS}]`)
    const increment = (v: any) => {
      // uiService.info("counter = " + counter)
      counter++
      if (counter === N_TASKS) {
        interactive.success(`Getting Versions... [${counter}/${N_TASKS}]\n`)
      } else {
        interactive.await(`Getting Versions... [${counter}/${N_TASKS}]`)
      }
      return v
    }

    /**
     * Get versions
     */
    const { devspace: { hiveApiUrl, hiveReplUrl, tanajuraApiUrl, tanajuraGitUrl }, soilUrl } = await configService.readConfig()
    const soilVersion = soilService.getVersion().catch(() => NoVersion).then(increment)
    const hiveVersion = hiveService.getVersion().catch(() => NoVersion).then(increment)
    const tanajuraVersion = tanajuraService.getVersion(tanajuraApiUrl).catch(() => NoVersion).then(increment)
    /**
     * Render output
     */
    const out = [
      // {service: 'Hive', version: await hiveVersion, url:`${hiveApiUrl}\n${hiveReplUrl}`},
      {service: 'Hive', version: await hiveVersion, url: [hiveApiUrl, hiveReplUrl]},
      {service: 'Tanajura', version: await tanajuraVersion, url: [tanajuraApiUrl, tanajuraGitUrl]},
      {service: 'Soil', version: await soilVersion, url: [soilUrl]},
    ]
    outputService.put(out, flags as IOutputFlags)
  }
}
