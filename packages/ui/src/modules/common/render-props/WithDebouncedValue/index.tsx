import React from 'react'
import _ from 'lodash'

export interface IDebouncedTextInputProps {
  value: string,
  onChange: (value: string) => void
  render: (onChange: IDebouncedTextInputProps['onChange'], value: string) => JSX.Element
}

export interface IDebouncedTextInputState {
  onHoldValue: string
}

export class WithDebouncedValue extends React.Component<IDebouncedTextInputProps, IDebouncedTextInputState> {
  constructor(props: IDebouncedTextInputProps) {
    super(props)
    this.state = {
      onHoldValue: props.value
    }
  }

  public componentWillReceiveProps(nextProps: IDebouncedTextInputProps) {
    if (this.state.onHoldValue !== nextProps.value) {
      this.setState({
        onHoldValue: nextProps.value
      })
    }
  }

  private debouncedOnChangeProps = _.debounce(this.props.onChange, 500)

  private handleLocalChange = (value: string) => {
    this.setState({
      onHoldValue: value,
    })
    this.debouncedOnChangeProps(value)
  }

  public render() {
    const {
      onHoldValue
    } = this.state
    const {
      render,
    } = this.props
    return render(this.handleLocalChange, onHoldValue)
  }
}
