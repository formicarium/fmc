import React from 'react'
import { InterfacesList } from '../InterfacesList';
import styled from 'styled-components';
import { Header, Image, Button, Segment } from 'semantic-ui-react';
import { IApplicationLinks } from 'common';
import { PromiseButton } from '~/modules/common/components/PromiseButton';

export interface IApplicationProps {
  name: string
  links: IApplicationLinks
  className?: string
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
}
const Actions: React.SFC<IActionsProps> = ({
  onClickDelete,
  onClickRestart,
}) => (
  <Button.Group>
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
  onClickDelete,
  onClickRestart,
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
      />
    </ActionsWrapper>

  </Segment>
)
