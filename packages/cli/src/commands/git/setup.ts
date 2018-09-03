import * as path from 'path'
import {flags as Flags} from '@oclif/command'
import { getServiceIdentifier } from '../../logic/service'
import { gitSetup } from '../../controllers/git'
import FMCCommand from '../../FMCCommand'

export default class GitSetup extends FMCCommand {
  public static description = 'Deploys service'

  public static examples = [
    `$ fmc service:setup .`,
  ]

  public static flags = {
    help: Flags.help({char: 'h'}),
    shard: Flags.string({char: 's', description: 'service shard'}),
  }

  public static args = [
    {name: 'name'},
    {name: 'localFolder'},
  ]

  public async run() {
    const { gitService, configService, tanajuraService, uiService } = this.system

    const { args, flags } = this.parse(GitSetup)
    const { shard } = flags
    const { name, localFolder } = args
    const localFolderPath = path.resolve(process.cwd(), localFolder)
    const { devspace, soilUrl } = await configService.readConfig()
    const namespace = devspace.name
    const service = getServiceIdentifier(name, shard)

    uiService.jsonToTable({
      localFolderPath,
      service,
    })

    /**
     * Creates remote repo on Tanajura
     */
    // uiService.spinner.start('Creating repo...')
    await gitSetup(namespace, service, localFolderPath, tanajuraService, gitService, configService, uiService)
    // uiService.spinner.succeed()
  }
}
