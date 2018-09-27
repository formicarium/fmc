import FMCCommand from '../FMCCommand'
import {flags as Flags} from '@oclif/command'
import {spawn} from 'child_process'
import * as inquirer from 'inquirer'

export default class Repl extends FMCCommand {
  public static description = "Connects to remote repl. If no service is provided, connects on Hive's Repl"

  public static examples = [
    `$ fmc repl`,
    `$ fmc repl purgatory`,
    `$ fmc repl purgatory common-repl`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({char: 'h'}),
  }

  public static args = [
    {
      name: 'serviceName',
      required: false,
    },
    {
      name: 'interfaceName',
      required: false,
    },
  ]

  private connect(host: string) {
    if (!host.startsWith("nrepl")) {
      //console.log(`||${host.slice(0, 5)}||`)
      console.warn("Trying to connect on a non-repl interface: " + host)
    }
    spawn('lein', ['repl', ':connect', host], {
      stdio: [process.stdin, process.stdout, process.stderr],
    })
  }

  public async run() {
    const {configService, soilService} = this.system
    const {devspace: {name: currentDevspace, hiveReplUrl}} = await configService.readConfig()
    const {args: {serviceName, interfaceName}} = this.parse(Repl)

    if (serviceName) {
      const {links} = await soilService.getService(currentDevspace, serviceName)
      if (interfaceName) {
        const replUrl = links[interfaceName]
        this.connect(replUrl);
      } else {
        const interfaces = Object.keys(links)
        const nreplInterfaces = interfaces.filter((i: string) => links[i].startsWith("nrepl"))
        let responses: any = await inquirer.prompt([{
          name: 'nreplInterface',
          message: 'select a interface',
          type: 'list',
          choices: nreplInterfaces,
        }])

        let nrepl = responses.nreplInterface
        console.info(`You selected ${nrepl} interface. Trying to connect to ${links[nrepl]}`)
        this.connect(links[nrepl])
      }
    }
    if (!serviceName && !interfaceName) {
      this.connect(hiveReplUrl);
    }
  }
}
