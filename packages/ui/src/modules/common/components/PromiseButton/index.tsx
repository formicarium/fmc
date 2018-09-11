import React from 'react'
import { Button, ButtonProps, Icon, SemanticCOLORS } from 'semantic-ui-react';

enum PromiseState {
  IDLE = 'IDLE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  LOADING = 'LOADIN',
}

interface IPromiseButtonState {
  promiseState: PromiseState
}
export class PromiseButton extends React.Component<ButtonProps, IPromiseButtonState> {
  private mounted = false

  public state = {
    promiseState: PromiseState.IDLE,
  }

  public componentDidMount() {
    this.mounted = true
  }

  public componentWillUnmount() {
    this.mounted = false
  }

  private safeStateState: React.Component<ButtonProps, IPromiseButtonState>['setState'] = (state) => {
    if (this.mounted) {
      this.setState(state)
    }
  }

  private handleClick = async (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => {
    this.safeStateState({
      promiseState: PromiseState.LOADING,
    })
    try {
      await this.props.onClick(event, data)
      this.safeStateState({
        promiseState: PromiseState.SUCCESS,
      })
    } catch (err) {
      this.safeStateState({
        promiseState: PromiseState.ERROR,
      })
    } finally {
      setTimeout(() => {
        this.safeStateState({
          promiseState: PromiseState.IDLE,
        })
      }, 1000)
    }
  }

  private isDisabled = () => this.state.promiseState === PromiseState.LOADING || this.props.disabled
  private isLoading = () => this.state.promiseState === PromiseState.LOADING
  private getColor = (): SemanticCOLORS => {
    switch (this.state.promiseState) {
      case PromiseState.IDLE:
      case PromiseState.LOADING:
        return this.props.color as SemanticCOLORS
      case PromiseState.ERROR:
        return 'red'
      case PromiseState.SUCCESS:
        return 'green'
    }
  }

  private getChildren = () => {
    switch (this.state.promiseState) {
      case PromiseState.IDLE:
      case PromiseState.LOADING:
        return this.props.children
      case PromiseState.ERROR:
        return <Icon name='close' color={this.getColor()} style={{margin: 0}}/>
      case PromiseState.SUCCESS:
        return <Icon name='check' color={this.getColor()} style={{margin: 0}}/>
    }
  }
  public render() {
    return (
      <Button
        {...this.props}
        disabled={this.isDisabled()}
        loading={this.isLoading()}
        color={this.getColor()}
        onClick={this.handleClick}
      >
        {this.getChildren()}
      </Button>
    )
  }
}
