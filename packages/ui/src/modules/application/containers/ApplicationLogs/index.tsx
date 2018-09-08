import React from 'react'
import { withSystem, ISystemProps } from '~/modules/core/components/SystemProvider';
import { Segment, Loader } from 'semantic-ui-react';
import { TerminalScreen } from '~/modules/application/components/TerminalScreen';
import { ChildProcess } from 'child_process';
import styled from 'styled-components';

export interface IApplicationLogsProps {
  namespace: string,
  applicationName: string
}
interface IApplicationLogsState {
  streamedText: string,
  loading: boolean
}

const LoadingWrapper = styled(Segment)`
  width: 100%;
  height: 200px;
`

const TerminalWrapper = styled(Segment)`
  width: 100%;
`
export class ApplicationLogsInner extends React.Component<ISystemProps & IApplicationLogsProps, IApplicationLogsState> {
  private childProcess: ChildProcess

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
    this.childProcess = childProcess
    childProcess.stdout.on('data', (data) => {
      this.setState((state) => ({
        streamedText: `${state.streamedText}${data.toString()}`,
      }))
    })
  }

  public componentWillUnmount() {
    if (this.childProcess) {
      this.childProcess.kill('SIGINT')
    }
  }

  public render() {
    if (this.state.loading) {
      return (
        <LoadingWrapper inverted vertical>
          <Loader active inverted>
            Obtaining POD...
          </Loader>
        </LoadingWrapper>
      )
    }
    return (
      <TerminalWrapper inverted>
        <TerminalScreen text={this.state.streamedText} />
      </TerminalWrapper>
    )
  }
}

export const ApplicationLogs = withSystem(ApplicationLogsInner)
