import React from 'react'
import { InterfacesList } from '../InterfacesList';
import styled from 'styled-components';
import { Header, Image, Button, Segment } from 'semantic-ui-react';
import { IApplicationLinks } from 'common';
import { PromiseButton } from '~/modules/common/components/PromiseButton';
import { ApplicationLogs } from '~/modules/application/containers/ApplicationLogs';

export interface IApplicationProps {
  name: string
  links: IApplicationLinks
  className?: string
  showLogs: boolean;
}

const StatusImage = styled(Image)`
  width: 16px !important;
  height: 16px !important;
  margin-left: 8px;
`

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const ONLINE_ICON = 'https://cdn4.iconfinder.com/data/icons/fugue/icon_shadowless/status.png'

export interface IActionsProps {
  onClickDelete: () => void
  onClickRestart: () => void;
  onClickLogs: () => void;
}
const Actions: React.SFC<IActionsProps> = ({
  onClickDelete,
  onClickRestart,
  onClickLogs,
}) => (
  <Button.Group>
    <Button color='yellow' onClick={onClickLogs} basic>Logs</Button>
    <PromiseButton color='purple' onClick={onClickRestart} basic>Restart</PromiseButton>
    <PromiseButton color='red' onClick={onClickDelete}>Delete</PromiseButton>
  </Button.Group>
)

const ActionsWrapper = styled.div`
  margin-top: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const Application: React.SFC<IApplicationProps & IActionsProps> = ({
  name,
  links,
  className,
  showLogs,
  onClickDelete,
  onClickRestart,
  onClickLogs,
}) => (
  <Segment className={className}>
    <StyledHeader dividing>
      {name} <StatusImage src={ONLINE_ICON} />
    </StyledHeader>

    <Header size='tiny'>
      Links
    </Header>

    <InterfacesList
      links={links}
    />

    <ActionsWrapper>
      <Actions
        onClickDelete={onClickDelete}
        onClickRestart={onClickRestart}
        onClickLogs={onClickLogs}
      />
    </ActionsWrapper>

    {(showLogs) && (
      <ApplicationLogs
        namespace={'rafa'}
        applicationName={name}
      />
    )}
  </Segment>
)
