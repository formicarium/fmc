import React from 'react'
import styled from 'styled-components';
import { Header, Image } from 'semantic-ui-react';

export interface IEmptyState {
  message?: string
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px;
`

export const EmptyState: React.SFC<IEmptyState> = ({
  message,
}) => (
  <Wrapper>
    <Image
      src='http://icons.iconarchive.com/icons/martin-berube/animal/256/ant-icon.png'
      size='small'
      style={{opacity: 0.75}}
    />
    <Header as='h4'>
      {message || 'Nothing here'}
    </Header>
  </Wrapper>
)
