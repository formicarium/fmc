import { IHashMap, Maybe } from './../typings/common'
import * as ora from 'ora'
import { Ora } from '../typings/ora'
import * as inquirer from 'inquirer'
import * as signale from 'signale'
import * as Table from 'tty-table'

export interface IUIService {
  log: (what: any) => void
  spinner: Ora
  promptBoolean: (message: string) => Promise<boolean>
  warn: (message: string) => void
  error: (message: string) => void
  success: (message: string) => void
  info: (message: string) => void
  newInteractive: () => signale.Signale
  jsonToTable: (json: IHashMap<Maybe<string>>, firstColumnOptions?: object, valueColumnOptions?: object) => void
}

export class UIService implements IUIService {
  public spinner: Ora = ora()

  public promptBoolean = (message: string): Promise<boolean> => {
    return inquirer.prompt<{answer: boolean}>({
      type: 'confirm',
      name: 'answer',
      message,
    }).then((data) => {
      return data.answer
    })
  }

  public log = (message: string) => console.log(message)
  public warn = (message: string) => signale.warn(message)
  public error = (message: string) => signale.error(message)
  public success = (message: string) => signale.success(message)
  public info = (message: string) => signale.info(message)

  public newInteractive = () => new signale.Signale({ interactive: true })

  public jsonToTable = (json: IHashMap<Maybe<string>>, firstColumnOptions?: object, valueColumnOptions?: object) => {
    const headers = [{value: 'key', ...firstColumnOptions}, { value: 'value', ...valueColumnOptions }]
    const columns = Object.keys(json).map((key) => ([key, json[key] || '-']))
    const table = new Table(headers, columns)
    this.log(table.render())
  }
}
