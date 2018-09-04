import React from 'react'
import { Application } from '../Application';
import styled from 'styled-components';
import { IApplication } from 'common';

export interface IApplicationsListProps {
  applications: IApplication[]
  onClickDelete: (application: IApplication) => void;
  onClickRestart: (application: IApplication) => void;
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
}) => (
  <Wrapper>
    {applications && applications.map((application) => (
      <StyledApplication
        key={application.name}
        name={application.name}
        links={application.links}
        onClickDelete={() => onClickDelete(application)}
        onClickRestart={() => onClickRestart(application)}
      />
    ))}
  </Wrapper>
)
