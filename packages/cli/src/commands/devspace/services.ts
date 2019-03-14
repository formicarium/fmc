import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../FMCCommand'
import { IOutputFlags } from '../../services/output'
export interface IInterfacesCell {
  [name: string]: string
}
export interface IServiceRow {
  application: string,
  interfaces: IInterfacesCell
}
export default class DevspaceServices extends FMCCommand {
  public static description = 'Lists the services in your devspace'

  public static examples = [
    `$ fmc devspace:services`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    help: Flags.help({ char: 'h' }),
  }

  public static args = [
    { name: 'name' },
  ]

  public async run() {
    const { uiService, configService, outputService } = this.system
    const { name } = await configService.readDevspaceConfig()
    const { args, flags } = this.parse(DevspaceServices)

    // uiService.spinner.start(`Listing services of ${name}`)
    const response = await this.system.soilService.getDevspace(name)

    if (args.name) {
      const ser = response.applications.find((s) => s.name === args.name)
      uiService.log('\n')
      if (ser) {
        Object.keys(ser.links).forEach((key) => {
          uiService.log(`+ ${key}: ${ser.links[key]}`)
        })
        uiService.log('\n')
      }
    } else {
      const table = response.applications.map((app) => ({
        application: app.name,
        interfaces: Object.keys(app.links).reduce((accLinks, linkName) => ({
          ...accLinks,
          [linkName]: app.links[linkName],
        }), {} as IInterfacesCell),
      }))
      // uiService.jsonToTable(table, { value: 'Application', align: 'left', width: 30 }, { value: 'Interfaces', align: 'left' })
      outputService.put(table, flags as IOutputFlags)
    }
    // uiService.spinner.succeed()
  }
}
