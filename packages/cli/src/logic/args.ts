import { IArgs } from '@formicarium/common'

export const parseArg = (argString: string[]): IArgs => {
  return argString.reduce((acc, arg) => {
    const [ key, value ] = arg.split('=')
    return {
      ...acc,
      [key]: value,
    }
  }, {})
}
