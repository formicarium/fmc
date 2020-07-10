import FMCCommand from '../FMCCommand'
import { Nullable, IMocks, IServiceMockConfig } from '@formicarium/common'
import { flags as Flags } from '@oclif/command'
import * as path from 'path'
import { spawn } from 'child_process'
import * as inquirer from 'inquirer'
import { getFileContent } from '../common'
import * as fs from 'fs-extra'
import { UIService } from '../services/ui'


export default class Mock extends FMCCommand {
  public static description = "Configures mocks for a given devspace"

  public static examples = [
    `$ fmc mock -d ./mocks`,
    `$ fmc mock -f ./mocks.json`,
  ]

  public static flags = {
    ...FMCCommand.flags,
    directory: Flags.string({
      char: 'd',
      description: 'a folder with one file per service',
      required: false,
    }),
    file: Flags.string({
      char: 'f',
      description: 'a file with all mock configuration',
      required: false,
    }),
    help: Flags.help({ char: 'h' }),
  }

  public static args = []

  public print(obj) {
    console.log(JSON.stringify(obj, null, 2))
  }


  public extractFileName(withExtension : string) : string {
    return withExtension.split(".")[0]
  }

  public async readAllJsonFiles(directory: string) : Promise<Nullable<IMocks>> {
      const files = fs.readdirSync(directory)
      const jsons = await Promise.all(
        files
        .filter((f) => f.endsWith(".json"))
        .map(async (f) => {return [this.extractFileName(f), await getFileContent<IServiceMockConfig>(path.join(directory, f))]})
      )
      return jsons.reduce((acc, [x, y]) => Object.assign(acc, {[x as string]: y}), {})
  }

  public async getMocks(file: Nullable<string>, directory: Nullable<string>) : Promise<Nullable<IMocks>> {
    if (file && fs.pathExistsSync(file)) {
      return await getFileContent<IMocks>(file)
    }
    if (directory && fs.pathExistsSync(directory)) {
      return await this.readAllJsonFiles(directory)
    } 
    return null
  }

  public async run() {
    const { pitfallService, uiService, outputService } = this.system
    const currentDevspace = await this.currentDevspace()

    // const { devspace: { hiveReplUrl } } = await configService.readConfig()
    const { flags } = this.parse(Mock)

    const { file, directory } = flags

    if (!file && !directory) {
      // this.error("You must provide `--file` or `--directory` flags")

      const mocks = await pitfallService.getMocks(currentDevspace)
      console.log(JSON.stringify(mocks, null, 2))
      return null
    }
    if (file && directory) {
      this.error("You can't define both `--file` and `--directory` flags")
    }

    const mocks = await this.getMocks(file, directory)
    this.print(mocks)
    if (mocks) {
      uiService.spinner.start('Updating mocks...')
      await pitfallService.upsertMocks(currentDevspace, mocks)
      uiService.spinner.succeed("Mocks updated!")
    } else {
      this.error("Error trying to resolve mocks configuration")
    }
  }
}
