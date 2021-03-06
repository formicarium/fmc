import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../FMCCommand'

export default class ServiceLogs extends FMCCommand {
  public static description = 'A service logs in the current Devspace'

  public static examples = [
    `$ fmc service:logs mancini`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
    follow: Flags.string({ char: 'f', description: 'Follow logs' }),
  }

  public static args = [
    { name: 'name', required: true },
  ]

  public async run() {
    const { configService, kubectl } = this.system
    const { args } = this.parse(ServiceLogs)
    const { name } = args

    const config = await configService.readConfig()
    const { devspace } = config

    const pod = await kubectl.getPodByLabel(devspace.name, name, {bin: config.kubectlBin})
    if (!pod) {
      this.error(`No pod "${name}" found in "${devspace.name}"`)
      return
    }
    const podName = pod.metadata.name
    const childProcess = kubectl.streamLogs(devspace.name, podName, name, {bin: config.kubectlBin})
    childProcess.stdout.on('data', (buf) => {
      console.log(buf.toString())
    })
  }
}
