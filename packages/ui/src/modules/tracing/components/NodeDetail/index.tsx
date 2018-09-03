import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
`

export interface INodeDetailProps {
  id: string
  label: string,
}

const Text = styled.div`
  color: #FFF;
  font-size: 32px;
  line-height: 32px;
  font-family: 'Open Sans', sans-serif;
`
export const NodeDetail: React.SFC<INodeDetailProps> = ({
  id,
  label,
}) => (
  <Wrapper>
    <Text>Label: {label}</Text>
  </Wrapper>
)
