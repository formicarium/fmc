import React from 'react'
import { Application } from '../Application';
import styled from 'styled-components';
import { IApplication, IHashMap } from '@formicarium/common';

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
  showSync: boolean;
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
  showSync,
  onToggleSync,
}) => (
  <Wrapper>
    {applications && applications.map((application) => (
      <StyledApplication
        key={application.name}
        devspace={application.devspace}
        name={application.name}
        showLogs={applicationsShowingLogs[application.name]}
        isSyncing={applicationsSyncing[application.name] || false}
        links={application.links}
        onClickDelete={() => onClickDelete(application)}
        onClickRestart={() => onClickRestart(application)}
        onClickLogs={() => onClickLogs(application)}
        showDelete={showDelete}
        showRestart={showRestart}
        showSync={showSync}
        onToggleSync={(sync) => onToggleSync(application, sync)}
      />
    ))}
  </Wrapper>
)
