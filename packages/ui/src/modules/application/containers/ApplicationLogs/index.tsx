import React from 'react'
import { withSystem, ISystemProps } from '~/modules/core/components/SystemProvider';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import { TerminalScreen } from '~/modules/application/components/TerminalScreen';
import { ChildProcess } from 'child_process';

export interface IApplicationLogsProps {
  namespace: string,
  applicationName: string
}
interface IApplicationLogsState {
  streamedText: string,
  loading: boolean
}

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
    console.log(pod)
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
        <Segment inverted style={{width: '100%', height: 200}} vertical>
          <Loader active inverted>
            Obtaining POD...
          </Loader>
        </Segment>
      )
    }
    return (
      <Segment inverted style={{width: '100%'}}>
        <TerminalScreen text={this.state.streamedText} />
      </Segment>
    )
  }
}

export const ApplicationLogs = withSystem(ApplicationLogsInner)
