import * as path from 'path'
import {flags as Flags} from '@oclif/command'
import { gitSetup } from '../../controllers/git'
import FMCCommand from '../../FMCCommand'
import { getServiceIdentifier } from '@formicarium/common'
import { IOutputFlags } from '../../services/output'

export default class GitSetup extends FMCCommand {
  public static description = 'Deploys service'

  public static examples = [
    `$ fmc service:setup .`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({char: 'h'}),
    shard: Flags.string({char: 's', description: 'service shard'}),
  }

  public static args = [
    {name: 'name'},
    {name: 'localFolder'},
  ]

  public async run() {
    const { gitService, configService, tanajuraService, uiService, outputService } = this.system

    const { args, flags } = this.parse(GitSetup)
    const { shard } = flags
    const { name, localFolder } = args
    const localFolderPath = path.resolve(process.cwd(), localFolder)
    const { devspace } = await configService.readConfig()
    const { name: devspaceName, tanajuraApiUrl} = devspace
    const service = getServiceIdentifier(name, shard)
    outputService.put([{
      localFolderPath,
      service,
    }], flags as IOutputFlags)

    /**
     * Creates remote repo on Tanajura
     */
    // uiService.spinner.start('Creating repo...')
    await gitSetup(devspaceName, service, localFolderPath, tanajuraApiUrl, tanajuraService, gitService, configService, uiService)
    // uiService.spinner.succeed()
  }
}
