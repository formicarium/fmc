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
  public state = {
    promiseState: PromiseState.IDLE,
  }

  private handleClick = async (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => {
    this.setState({
      promiseState: PromiseState.LOADING,
    })
    try {
      await this.props.onClick(event, data)
      this.setState({
        promiseState: PromiseState.SUCCESS,
      })
    } catch (err) {
      this.setState({
        promiseState: PromiseState.ERROR,
      })
    } finally {
      setTimeout(() => {
        this.setState({
          promiseState: PromiseState.IDLE,
        })
      }, 1000)
    }
  }

  private isDisabled = () => this.state.promiseState === PromiseState.LOADING
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
