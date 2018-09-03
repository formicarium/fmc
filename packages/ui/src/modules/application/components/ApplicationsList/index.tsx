import React from 'react'
import { Application } from '../Application';
import { IInterface } from '../InterfacesList';
import styled from 'styled-components';

export interface IApplication {
  id: string
  name: string
  interfaces: IInterface[]
}

export interface IApplicationsListProps {
  applications: IApplication[]
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
        key={application.id}
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
