import React from 'react'
import { Table } from 'semantic-ui-react'
import R from 'ramda'
import moment from 'moment'
import styled from 'styled-components';
import { IEvent } from '~/modules/tracing/graphql/queries/events';

export interface IEventListProps {
  events: IEvent[]
  activeStartIndex: number
  activeEndIndex: number
  onClickRow: (event: IEvent, index: number) => void
}
const ROW_HEIGHT = 42
const HEADER_HEIGHT = 46
const NEXT_VISIBLE_CELLS = 2

const getScrollTop = (index: number, height: number) => HEADER_HEIGHT + (ROW_HEIGHT * (index + (NEXT_VISIBLE_CELLS + 1))) - height

const Wrapper = styled.div`
  background-color: #FFF;
  overflow: hidden;
  overflow-y: auto;
`

const StyledTableBody = styled(Table.Body)`
  cursor: pointer;
`

const StyledTableRow = styled(Table.Row)`
  transition: background-color 300ms;
`

const pathOrEmptyString = R.pathOr('')

export class EventList extends React.Component<IEventListProps> {
  private scrollRef = React.createRef<HTMLDivElement>()
  public componentDidUpdate() {
    if (this.scrollRef.current) {
      this.scrollRef.current.scrollTop = getScrollTop(this.props.activeEndIndex, this.scrollRef.current.clientHeight)
    }
  }
  public render() {
    const {
      events,
      onClickRow,
    } = this.props
    return (
      <Wrapper innerRef={this.scrollRef}>
        <Table selectable fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width='1'>Identity</Table.HeaderCell>
              <Table.HeaderCell width='2'>Type</Table.HeaderCell>
              <Table.HeaderCell width='2'>Direction</Table.HeaderCell>
              <Table.HeaderCell width='2'>Timestamp</Table.HeaderCell>
              <Table.HeaderCell width='3'>CID</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <StyledTableBody>
            {events && events.map((event, i) => (
              <StyledTableRow
                key={event.id}
                // active={i <= activeEndIndex && i >= activeStartIndex}
                onClick={() => onClickRow(event, i)}
                >
                <Table.Cell>{event.meta.service}</Table.Cell>
                <Table.Cell>{pathOrEmptyString(['payload', 'tags', 'type'], event)}</Table.Cell>
                <Table.Cell>{pathOrEmptyString(['payload', 'tags', 'direction'], event)}</Table.Cell>
                <Table.Cell>{moment(event.meta.timestamp).format('HH:mm:ss')}</Table.Cell>
                <Table.Cell>{pathOrEmptyString(['payload', 'context', 'spanId'], event)}</Table.Cell>
              </StyledTableRow>
            ))}
          </StyledTableBody>
        </Table>

      </Wrapper>
    )
  }
}
