export type Nullable<T> = T | null
export type Maybe<T> = T | undefined
export interface IHashMap<V>  {
  [key: string]: V
}
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
export type Subtract<T, K> = Omit<T, keyof K>
