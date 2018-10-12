import React from 'react'
import { Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import { EventType } from '~/modules/tracing/model/event';
import { SearchBar } from '~/modules/tracing/components/SearchBar';
import { SpanType } from '~/modules/tracing/graphql/queries/events';

const enumToOptions = (obj: any) => Object.keys(obj).map((k) => ({
  key: k,
  value: obj[k] as string,
  text: obj[k] as string,
}))

const EVENT_TYPE_OPTIONS = enumToOptions(SpanType)

const buildOptionsFromStringArray = (stringArray: string[]) => stringArray.map((str) => ({
  key: str,
  value: str,
  text: str,
}))

export interface IFilterFormProps {
  setServices: (services: string[]) => void,
  setEventTypes: (eventTypes: EventType[]) => void,
  services: string[],
  eventTypes: EventType[]
  searchRegex: string,
  servicesList: string[]
  submitSearch: () => void
  setSearchRegex: (searchRegex: string) => void
  loading: boolean
}

const Wrapper = styled.div`
  padding: 20px;
`

const distance = {
  marginBottom: 20,
}

const StyledSearchBar = styled(SearchBar)`
  margin-bottom: 20px;
`

export const FilterForm: React.SFC<IFilterFormProps> = ({
  setServices,
  setEventTypes,
  setSearchRegex,
  submitSearch,
  services,
  eventTypes,
  searchRegex,
  servicesList,
  loading,
}) => (
  <Wrapper>
    <StyledSearchBar
      searchText={searchRegex}
      onChangeSearchText={setSearchRegex}
      loading={loading}
      onSubmit={submitSearch}
    />
    <Dropdown
      placeholder='Services'
      multiple
      search
      selection
      fluid
      style={distance}
      options={buildOptionsFromStringArray(servicesList)}
      value={services}
      onChange={(_, data) => {
        setServices(data.value as string[])
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
      value={eventTypes}
      onChange={(_, data) => {
        setEventTypes(data.value as EventType[])
      }}
    />
  </Wrapper>
)
