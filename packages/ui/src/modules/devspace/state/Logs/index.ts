import { Container } from 'unstated';
import { IHashMap } from 'common';

export interface ILogsState {
  applicationsShowingLogs: IHashMap<boolean>
}

export class LogsState extends Container<ILogsState> {
  public state = {
    applicationsShowingLogs: {},
  }
  public toggleLogsForApplication = (name: string) => this.setState((state) => ({
    applicationsShowingLogs: {
      ...state.applicationsShowingLogs,
      [name]: !state.applicationsShowingLogs[name],
    },
  }))

  public showLogsForApplication = (name: string) => this.setState((state) => ({
    applicationsShowingLogs: {
      ...state.applicationsShowingLogs,
      [name]: true,
    },
  }))

  public hideLogsForApplication = (name: string) => this.setState((state) => ({
    applicationsShowingLogs: {
      ...state.applicationsShowingLogs,
      [name]: false,
    },
  }))
}
