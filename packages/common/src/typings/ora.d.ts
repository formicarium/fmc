interface PersistOptions {
  symbol?: string;
  text?: string;
}

type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray';

export class Ora {
  start(text?: string): Ora
  stop(): Ora
  succeed(text?: string): Ora
  fail(text?: string): Ora
  warn(text?: string): Ora
  info(text?: string): Ora
  stopAndPersist(options?: PersistOptions | string): Ora
  clear(): Ora
  render(): Ora
  frame(): Ora
  text: string
  color: Color
  frameIndex: number
}