import React, { SyntheticEvent } from 'react'
import { Button, Input } from 'semantic-ui-react'
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledInput = styled(Input)`
  flex-grow: 1;
  margin-right: 10px;
`

interface IProps {
  loading: boolean;
  searchText: string;
  onChangeSearchText: (searchText: string) => void;
  onSubmit: () => void;
  className?: string;
}
export const SearchBar: React.SFC<IProps> = ({
  loading,
  searchText,
  className,
  onChangeSearchText,
  onSubmit,
}) => (
  <Wrapper className={className}>
    <StyledInput
      loading={loading}
      value={searchText}
      icon='search'
      placeholder='CID'
      onChange={(e: SyntheticEvent<HTMLInputElement>) => {
        onChangeSearchText(e.currentTarget.value)
      }}
      onKeyPress={(event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          onSubmit()
        }
      }}
    />
    <Button>Search</Button>
  </Wrapper>
)
