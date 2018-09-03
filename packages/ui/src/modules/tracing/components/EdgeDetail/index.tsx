import React from 'react'
import styled from 'styled-components';
import { INode } from '../../model/graph';

const Wrapper = styled.div`
  /* display: flex;
  flex-direction: column; */
  padding: 20px;
`

export interface IEdgeDetailProps {
  id: string
  label: string,
  from: INode
  to: INode
}

const Text = styled.div`
  color: #FFF;
  font-size: 32px;
  line-height: 32px;
  font-family: 'Open Sans', sans-serif;
`
export const EdgeDetail: React.SFC<IEdgeDetailProps> = ({
  id,
  label,
  from,
  to,
}) => (
  <Wrapper>
    <Text>Label: {label}</Text>
    <Text>From: {from.label}</Text>
    <Text>To: {to.label}</Text>
  </Wrapper>
)
