import React from 'react'
import { Maybe } from 'common';

export interface IPromiseState<T> {
  loading: boolean
  error: Maybe<Error>
  data: Maybe<T>
}

type RetryFunction = () => void
export type PatchData<T> = (data: T) => void

export interface IErrorComponentProps {
  error: Error
  retry: RetryFunction
}

export interface IPromiseManagerProps<T> {
  promise: () => Promise<T>
  LoadingComponent: React.ComponentType
  ErrorComponent: React.ComponentType<IErrorComponentProps>
  children: (promiseState: IPromiseState<T>, retry: RetryFunction, patchData: PatchData<T>) => JSX.Element
}

export class PromiseManager<T> extends React.Component<IPromiseManagerProps<T>, IPromiseState<T>> {
  constructor(props: IPromiseManagerProps<T>) {
    super(props)
    this.state = {
      loading: true,
      error: undefined,
      data: undefined,
    }
  }

  private dispatchPromise = async () => {
    const {
      promise,
    } = this.props

    try {
      this.setState({
        loading: true,
      })
      const data = await promise()

      this.setState({
        data,
        loading: false,
      })
    } catch (error) {
      this.setState({
        error,
        loading: false,
      })
    }
  }
  public componentDidMount() {
    this.dispatchPromise()
  }

  private retry = () => {
    this.dispatchPromise()
  }

  private patchData = (data: T) => this.setState({
    data,
  })
  public render() {
    const {
      loading,
      error,
    } = this.state
    const {
      LoadingComponent,
      ErrorComponent,
    } = this.props

    if (loading) {
      return (
        <LoadingComponent />
      )
    }

    if (error) {
      return (
        <ErrorComponent
          retry={this.retry}
          error={error}
        />
      )
    }

    return (
      this.props.children(this.state, this.retry, this.patchData)
    )
  }
}
