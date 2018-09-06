import React from 'react'
import { InterfacesList } from '../InterfacesList';
import styled from 'styled-components';
import { Header, Image, Button, Segment, Checkbox } from 'semantic-ui-react';
import { IApplicationLinks } from 'common';
import { PromiseButton } from '~/modules/common/components/PromiseButton';
import { ApplicationLogs } from '~/modules/application/containers/ApplicationLogs';

export interface IApplicationProps {
  devspace: string
  name: string
  links: IApplicationLinks
  className?: string
  showLogs: boolean;
  isSyncing: boolean;
  onToggleSync: (sync: boolean)  => void;
  showSync: boolean;
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
  showDelete: boolean;
  showRestart: boolean;
}
const Actions: React.SFC<IActionsProps> = ({
  onClickDelete,
  onClickRestart,
  onClickLogs,
  showDelete,
  showRestart,
}) => (
  <Button.Group>
    <Button color='yellow' onClick={onClickLogs} basic>Logs</Button>
    { showRestart && <PromiseButton color='purple' onClick={onClickRestart} basic>Restart</PromiseButton>}
    { showDelete && <PromiseButton color='red' onClick={onClickDelete}>Delete</PromiseButton>}
  </Button.Group>
)

const ActionsWrapper = styled.div`
  margin-top: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const isSyncable = (links: IApplicationLinks): boolean => !!links.stinger

export const Application: React.SFC<IApplicationProps & IActionsProps> = ({
  devspace,
  name,
  links,
  className,
  showLogs,
  isSyncing,
  onClickDelete,
  onClickRestart,
  onClickLogs,
  onToggleSync,
  showDelete,
  showRestart,
  showSync,
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
      { (showSync && isSyncable(links))
        ? <Checkbox label='Sync files' toggle checked={isSyncing} onChange={(e, data) => onToggleSync(data.checked)}/>
        : <div />
      }

      <Actions
        onClickDelete={onClickDelete}
        onClickRestart={onClickRestart}
        onClickLogs={onClickLogs}
        showDelete={showDelete}
        showRestart={showRestart && isSyncable(links)}
      />
    </ActionsWrapper>

    {(showLogs) && (
      <ApplicationLogs
        namespace={devspace}
        applicationName={name}
      />
    )}
  </Segment>
)
