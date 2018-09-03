import Command from '@oclif/command'
import * as signale from 'signale'
import chalk from 'chalk'
import { ISystem, getSystem } from '@formicarium/common'

export default abstract class FMCCommand extends Command {

  public system!: ISystem

  protected async init(): Promise<any> {
    this.system = await getSystem()
    const { name } = await this.system.configService.readDevspaceConfig()
    signale.info(`Currently using Devspace: ${chalk.underline(name)}`)
  }

}
