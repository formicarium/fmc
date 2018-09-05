import React from 'react'
import { Application } from '../Application';
import styled from 'styled-components';
import { IApplication, IHashMap } from 'common';

export interface IApplicationsListProps {
  applicationsShowingLogs: IHashMap<boolean>
  applicationsSyncing: IHashMap<boolean>
  applications: IApplication[]
  onClickDelete?: (application: IApplication) => void;
  onClickRestart?: (application: IApplication) => void;
  onClickLogs: (application: IApplication) => void;
  onToggleSync?: (application: IApplication, sync: boolean) => void;
  showDelete: boolean;
  showRestart: boolean;
  isSyncing?: boolean;
}

const Wrapper = styled.div`
`

const StyledApplication = styled(Application)`
  margin-bottom: 20px;
`
export const ApplicationsList: React.SFC<IApplicationsListProps> = ({
  applications,
  onClickDelete,
  onClickRestart,
  onClickLogs,
  applicationsShowingLogs,
  applicationsSyncing,
  showDelete,
  showRestart,
  onToggleSync,
}) => (
  <Wrapper>
    {applications && applications.map((application) => (
      <StyledApplication
        showLogs={applicationsShowingLogs[application.name]}
        isSyncing={applicationsSyncing[application.name]}
        key={application.name}
        name={application.name}
        links={application.links}
        onClickDelete={() => onClickDelete(application)}
        onClickRestart={() => onClickRestart(application)}
        onClickLogs={() => onClickLogs(application)}
        showDelete={showDelete}
        showRestart={showRestart}
        onToggleSync={(sync) => onToggleSync(application, sync)}
      />
    ))}
  </Wrapper>
)
