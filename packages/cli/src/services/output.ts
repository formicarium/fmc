import cli from 'cli-ux'
import highlight from 'cli-highlight'
import YAML from 'yaml'
import { flags as Flags } from '@oclif/command'

export interface IOutputService  {
  put<T extends object>(objects: T[], flags: IOutputFlags): void
}

export interface IOutputFlags {
  output: string,
  filter: string | undefined,
  csv: boolean | undefined
}

export const outputFlags = {
  ...cli.table.flags(),
  output: Flags.string({
    char: 'o',
    description: 'set output type',
    required: false,
    default: 'table',
  }),
}

export class OutputService implements IOutputService {

  private getColumns<T extends object>(objects: T[]) {
    const headers = objects.map((o) => Object.keys(o)).reduce((acc, value) => acc.concat(value))
    return headers.reduce((acc, header) => {
      return {
        ...acc,
        [header]: {
          minWidth: 20,
          get: (row) => {
            const value = row[header]
            if (value instanceof Array) {
              return value.join('\n')
            }
            if (value instanceof Object) {
              return [...Object.keys(value).map((k) => `${k}: ${value[k]}`), ''].join('\n')
            }
            return value
          },
        },
      }
    }, {})
  }

  public table<T extends object>(objects: T[], flags: IOutputFlags) {
    cli.table(objects, this.getColumns(objects), flags)
  }

  public json<T extends object>(objects: T[]) {
    console.log(highlight(JSON.stringify(objects, null, 2), {language: 'json'}))
  }

  public yaml<T extends object>(objects: T[]) {
    console.log(highlight(YAML.stringify(objects, {}), {language: 'yaml'}))
  }

  public put<T extends object>(objects: T[], flags: IOutputFlags): void {
    switch (flags.output) {
      case 'table': {
        this.table(objects, flags)
        break
      }
      case 'json': {
        this.json(objects)
        break
      }
      case 'yaml': {
        this.yaml(objects)
        break
      }
    }
  }
}
