import React from 'react'
import { withSystem, ISystemProps } from '~/modules/core/components/SystemProvider';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import Ansi from 'ansi-to-react'
import styled from 'styled-components';

export interface IApplicationLogsProps {
  namespace: string,
  applicationName: string
}
interface IApplicationLogsState {
  streamedText: string,
  loading: boolean
}

const TerminalWrapper = styled.div`
  font-family: 'Courier New';
  white-space: pre-line;
  height: 800;
  overflow-x: hidden;
  overflow-y: auto;
`

export interface ITerminalScreenProps {
  text: string
}

class TerminalScreen extends React.Component<ITerminalScreenProps> {
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
export class ApplicationLogsInner extends React.Component<ISystemProps & IApplicationLogsProps, IApplicationLogsState> {
  public state = {
    streamedText: '',
    loading: true,
  }
  public async componentDidMount() {
    const {
      system,
      namespace,
      applicationName,
    } = this.props
    const pod = await system.kubectl.getPodByLabel(namespace, applicationName)
    this.setState({
      loading: false,
    })
    const podName = pod.metadata.name
    const childProcess = system.kubectl.streamLogs(namespace, podName)
    childProcess.stdout.on('data', (data) => {
      this.setState((state) => ({
        streamedText: `${state.streamedText}${data.toString()}`,
      }))
    })
  }
  public render() {
    if (this.state.loading) {
      return (
        <Dimmer>
          <Loader active />
        </Dimmer>
      )
    }
    return (
      <Segment inverted>
        <TerminalScreen text={this.state.streamedText} />
      </Segment>
    )
  }
}

export const ApplicatLogs = withSystem(ApplicationLogsInner)
