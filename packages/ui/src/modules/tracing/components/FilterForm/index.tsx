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

const EDGE_TYPE_OPTIONS = [{
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
  traceId: string
  spanId: string
  parentId: string
  traceIdList: string[]
  spanIdList: string[]
  parentIdList: string[]
  setTraceId: (traceId: string) => void;
  setParentId: (traceId: string) => void;
  setSpanId: (traceId: string) => void;
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
  traceIdList,
  spanIdList,
  parentIdList,
  traceId,
  spanId,
  parentId,
  setTraceId,
  setParentId,
  setSpanId,
}) => (
  <Wrapper>
    <Dropdown
      placeholder='Node type'
      multiple
      search
      selection
      fluid
      style={distance}
      options={NODE_TYPE_OPTIONS}
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
      options={EDGE_TYPE_OPTIONS}
      value={filter.edge.types}
      onChange={(_, data) => {
        setFilterEdgeTypes(data.value as string[])
      }}
    />
    <Dropdown
      placeholder='Trace ID'
      search
      fluid
      style={distance}
      selection
      options={buildOptionsFromStringArray(traceIdList)}
      value={traceId}
      onChange={(_, data) => {
        setTraceId(data.value as string)
      }}
    />
    <Dropdown
      placeholder='Span ID'
      search
      fluid
      style={distance}
      selection
      options={buildOptionsFromStringArray(spanIdList)}
      value={spanId}
      onChange={(_, data) => {
        setSpanId(data.value as string)
      }}
    />
    <Dropdown
      placeholder='Parent ID'
      search
      fluid
      selection
      options={buildOptionsFromStringArray(parentIdList)}
      value={parentId}
      onChange={(_, data) => {
        setParentId(data.value as string)
      }}
    />
  </Wrapper>
)
