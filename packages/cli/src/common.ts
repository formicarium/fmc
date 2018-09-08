import { Maybe, Nullable } from '@formicarium/common'
import * as fs from 'fs-extra'

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getFileContent<A>(filePath: Maybe<string>): Promise<Nullable<A>> {
    if (!filePath) {
        return null
    }

    const fileExists = await fs.pathExists(filePath)
    if (!fileExists) {
        return Promise.reject(`File ${filePath} does not exist`)
    }

    const fileContent = await fs.readJson(filePath) as A

    return fileContent
}
