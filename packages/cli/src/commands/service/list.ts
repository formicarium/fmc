import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../FMCCommand'
import {IService} from '@formicarium/common/src/services/db'
import { IDevspace } from '@formicarium/common'
import { IOutputFlags } from '../../services/output'

export default class ServiceList extends FMCCommand {
  public static description = 'List services in the current Devspace'

  public static examples = [
    `$ fmc service:list`,
    `$ fmc service:list -o yaml`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
  }

  public static args = []

  public async run() {
    const { configService, localDB, gitService, soilService, outputService, tanajuraService } = this.system
    const { args, flags } = this.parse(ServiceList)
    const { name } = args

    const config = await configService.readConfig()
    const { hive, tanajura, applications }: IDevspace = await soilService.getDevspace(await this.currentDevspace())
    outputService.put([hive, tanajura, ...applications], flags as IOutputFlags)
  }
}
