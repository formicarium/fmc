import Command, { flags as Flags } from '@oclif/command'
import * as signale from 'signale'
import chalk from 'chalk'
import { getSystem, ISystem } from './system'
import * as inquirer from 'inquirer'
import { IApplication } from '@formicarium/common'
import { outputFlags } from './services/output'
export default abstract class FMCCommand extends Command {
  public system!: ISystem

  public static flags = {
    ...outputFlags,
  }

  protected currentDevspace = () => this.system.configService.readDevspaceConfig().then((c) => c.name)

  protected async init(): Promise<any> {
    this.system = await getSystem()
    const name = await this.currentDevspace()
    if (!name) {
      signale.warn(`You are not using any devspace! Be sure to run \`fmc devspace:use <devspace>\``)
    } else if (this.showDevspace()) {
      signale.info(`Currently using devspace: ${chalk.underline(name)}\n`)
    }
  }

  protected showDevspace(): boolean {
    return true
  }

  protected selectServiceApplication = async (service: string) => {
    const applications = await this.system.soilService.getService(await this.currentDevspace(), service)
    return this.selectApplication(applications)
  }

  protected getApplicationByName = async (applicationName: string): Promise<IApplication> => {
    const {applications} = await this.system.soilService.getDevspace(await this.currentDevspace())

    const app: IApplication | undefined = applications.find((a) => a.name === applicationName)
    if (!app) {
      signale.error(`Could not find application ${applicationName}`)
    }
    return app as IApplication
  }

  protected async selectApplication(applications: IApplication[]): Promise<IApplication> {
    if (applications.length > 1) {
      const responses = await inquirer.prompt<{ applicationName: string }>([{
        name: 'applicationName',
        message: 'Select an Application',
        type: 'list',
        choices: applications.map((a) => a.name),
      }])
      return applications.find((a) => a.name === responses.applicationName)!
    } else {
      return applications[0]
    }
  }

  protected async selectLink({ links }: IApplication): Promise<string> {
    const responses = await inquirer.prompt<{ interface: string }>([{
      name: 'interface',
      message: 'Select a Interface',
      type: 'list',
      choices: Object.keys(links),
    }])
    return links[responses.interface]
  }
}
