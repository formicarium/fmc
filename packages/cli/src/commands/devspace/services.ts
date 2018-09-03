import { flags as Flags } from '@oclif/command'
import FMCCommand from '../../FMCCommand'

export default class DevspaceServices extends FMCCommand {
  public static description = 'Lists the services in your devspace'

  public static examples = [
    `$ fmc devspace:services`,
  ]

  public static flags = {
    help: Flags.help({ char: 'h' }),
  }

  public static args = [
    { name: 'name' },
  ]

  public async run() {
    const { uiService, configService } = this.system
    const { name } = await configService.readDevspaceConfig()
    const { args } = this.parse(DevspaceServices)

    uiService.spinner.start(`Listing services of ${name}`)
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
      const table = response.applications.reduce((acc, app) => ({
        ...acc,
        [app.name]: Object.keys(app.links).reduce((accLinks, linkName) => ([
          ...accLinks,
          `+ ${linkName}: ${app.links[linkName]}`,
        ]), [] as string[]).join('\n'),
      }), {})
      uiService.jsonToTable(table, { value: 'Application', align: 'left', width: 30 }, { value: 'Interfaces', align: 'left' })
    }
    uiService.spinner.succeed()
  }
}
