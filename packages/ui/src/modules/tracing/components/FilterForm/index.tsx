import React from 'react'
import { Dropdown } from 'semantic-ui-react';
import { IFilter } from '../Dashboard';
import { EventType, NodeType } from '../../model/graph';
import styled from 'styled-components';

const NODE_TYPE_OPTIONS = [{
  key: NodeType.SERVICE,
  value: NodeType.SERVICE,
  text: 'Service',
}, {
  key: NodeType.TOPIC,
  value: NodeType.TOPIC,
  text: 'Topic',
}]

const EVENT_TYPE_OPTIONS = [{
  key: EventType.KAFKA,
  value: EventType.KAFKA,
  text: 'Kafka',
}, {
  key: EventType.HTTP_IN,
  value: EventType.HTTP_IN,
  text: 'HTTP',
}]

const buildOptionsFromStringArray = (stringArray: string[]) => stringArray.map((str) => ({
  key: str,
  value: str,
  text: str,
}))

export interface IFilterFormProps {
  setFilterNodeTypes: (types: string[]) => void,
  setFilterEdgeTypes: (types: string[]) => void,
  filter: IFilter
  servicesId: string[]
}

const Wrapper = styled.div`
  padding: 20px;
`

const distance = {
  marginBottom: 20,
}
export const FilterForm: React.SFC<IFilterFormProps> = ({
  setFilterNodeTypes,
  setFilterEdgeTypes,
  filter,
  servicesId,
}) => (
  <Wrapper>
    <Dropdown
      placeholder='Services'
      multiple
      search
      selection
      fluid
      style={distance}
      options={buildOptionsFromStringArray(servicesId)}
      value={filter.node.types}
      onChange={(_, data) => {
        setFilterNodeTypes(data.value as string[])
      }}
    />
    <Dropdown
      placeholder='Event type'
      multiple
      search
      fluid
      style={distance}
      selection
      options={EVENT_TYPE_OPTIONS}
      value={filter.edge.types}
      onChange={(_, data) => {
        setFilterEdgeTypes(data.value as string[])
      }}
    />
  </Wrapper>
)
