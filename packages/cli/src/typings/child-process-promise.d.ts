declare module 'child-process-promise' {
  export function exec(path: string): Promise<{ stdout: string, stderr: string }>
  export function spawn(program: string, args: string[]): {childProcess: any}
}
declare module 'tty-table'
declare module 'node-watch'
declare module 'gitignore-parser'