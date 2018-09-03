import * as util from 'util'

export const deepLog = (what: any) => console.log(util.inspect(what, false, null))
