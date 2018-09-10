import Command, { flags as Flags } from '@oclif/command'
import * as signale from 'signale'
import chalk from 'chalk'
import { getSystem, ISystem } from './system'

export default abstract class FMCCommand extends Command {
  public system!: ISystem

  public static flags = {
    test: Flags.boolean(),
  }

  protected async init(): Promise<any> {
    this.system = await getSystem()
    const { name } = await this.system.configService.readDevspaceConfig()
    signale.info(`Currently using devspace: ${chalk.underline(name)}`)
  }

  public async catch(err: Error) {
    // handle any error from the command
  }
  public async finally(err: Error) {
    // called after run and catch regardless of whether or not the command errored
  }
}
