import React from 'react'
import Ansi from 'ansi-to-react'
import styled from 'styled-components';

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
}

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
      <Ansi>
        {this.props.text}
      </Ansi>
    </TerminalWrapper>
    )
  }
}
