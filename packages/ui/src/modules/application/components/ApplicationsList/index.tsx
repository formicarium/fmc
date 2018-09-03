import React from 'react'
import { Application } from '../Application';
import styled from 'styled-components';
import { IApplicationDefinition } from 'common';

export interface IApplicationsListProps {
  applications: IApplicationDefinition[]
}

const Wrapper = styled.div`
`

const StyledApplication = styled(Application)`
  margin-bottom: 20px;
`
export const ApplicationsList: React.SFC<IApplicationsListProps> = ({
  applications,
}) => (
  <Wrapper>
    {applications && applications.map((application) => (
      <StyledApplication
        key={application.name}
        name={application.name}
        interfaces={application.interfaces}
        onClickDelete={() => {
          // impl
        }}
        onClickRestart={() => {
          // impl
        }}
      />
    ))}
  </Wrapper>
)
