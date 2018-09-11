import React from 'react'
import Ansi from 'ansi-to-react'
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

const TerminalWrapper = styled.div`
  font-family: 'Courier New';
  white-space: pre-line;
  height: 500;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`

export interface ITerminalScreenProps {
  text: string
  onClear?: () => void
}

const TrashButton = styled(Button)`
  position: absolute;
  right: 0px;
  top: 0px;
  margin: 0px !important;
  border-radius: 0px !important;
`
export class TerminalScreen extends React.Component<ITerminalScreenProps> {
  private scrollRef = React.createRef<HTMLDivElement>()
  public componentDidUpdate() {
    if (this.scrollRef.current) {
      this.scrollRef.current.scrollTop = this.scrollRef.current.scrollHeight
    }
  }
  public render() {
    return (
    <TerminalWrapper innerRef={this.scrollRef}>
      {this.props.onClear && <TrashButton icon='trash' onClick={this.props.onClear} />}
      <Ansi>
        {this.props.text}
      </Ansi>
    </TerminalWrapper>
    )
  }
}
