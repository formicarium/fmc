import React from 'react'
import { Nullable, Subtract, ISystem } from '@formicarium/common'

export const SystemContext = React.createContext<any>(null)

interface IProps<T> {
  system: Nullable<T>
}

export class SystemProvider<T> extends React.Component<IProps<T>> {
  public render() {
    return (
      <SystemContext.Provider value={this.props.system}>
        {this.props.children}
      </SystemContext.Provider>
    )
  }
}

export interface ISystemProps {
  system: ISystem
}
export const withSystem = <P extends ISystemProps>(WrappedComponent: React.ComponentType<P>) => {
  return class extends React.Component<
    Subtract<P, ISystemProps>
  > {
    public render() {
      return (
        <SystemContext.Consumer>
          {(system) => (
            <WrappedComponent system={system} />
          )}
        </SystemContext.Consumer>
      )
    }
  }
}
