import { getTestSystem } from './test-system'

import Command, { flags as Flags } from '@oclif/command'
import * as signale from 'signale'
import chalk from 'chalk'
import { ISystem, getSystem } from 'common'

export default abstract class FMCCommand extends Command {
  public system!: ISystem

  public static flags = {
    test: Flags.boolean(),
  }

  protected async init(): Promise<any> {
    try {
      const {flags} = this.parse(FMCCommand)

      const systemGetter = flags.test ? getTestSystem : getSystem
      this.system = await systemGetter()
      const { name } = await this.system.configService.readDevspaceConfig()

      if (flags.test) {
      console.log('[TEST MODE]')
    } else {
      signale.info(`Currently using Devspace: ${chalk.underline(name)}`)
    }
    } catch (err) {
      console.log(err)
    }
  }

  public async catch(err: Error) {
    console.log(err)
    // handle any error from the command
  }
  public async finally(err: Error) {
    console.log('finally')
    console.log(err)
    // called after run and catch regardless of whether or not the command errored
  }
}
