import React from 'react'
import { Application } from '../Application';
import styled from 'styled-components';
import { IApplication, IHashMap } from 'common';

export interface IApplicationsListProps {
  applicationsShowingLogs: IHashMap<boolean>
  applications: IApplication[]
  onClickDelete: (application: IApplication) => void;
  onClickRestart: (application: IApplication) => void;
  onClickLogs: (application: IApplication) => void;
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
}) => (
  <Wrapper>
    {applications && applications.map((application) => (
      <StyledApplication
        showLogs={applicationsShowingLogs[application.name]}
        key={application.name}
        name={application.name}
        links={application.links}
        onClickDelete={() => onClickDelete(application)}
        onClickRestart={() => onClickRestart(application)}
        onClickLogs={() => onClickLogs(application)}
      />
    ))}
  </Wrapper>
)
