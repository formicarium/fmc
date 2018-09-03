import React from 'react'
import { Table, Sticky } from 'semantic-ui-react'
import { IMessage, IHttpPayload, IKafkaPayload } from '../../model/event';
import moment from 'moment'
import styled from 'styled-components';

export interface IEventListProps {
  events: IMessage[]
  activeStartIndex: number
  activeEndIndex: number
  onClickRow: (message: IMessage, index: number) => void
}
const ROW_HEIGHT = 42
const HEADER_HEIGHT = 46
const NEXT_VISIBLE_CELLS = 2

const getScrollTop = (index: number, height: number) => HEADER_HEIGHT + (ROW_HEIGHT * (index + (NEXT_VISIBLE_CELLS + 1))) - height

const Wrapper = styled.div`
  background-color: #FFF;
  flex-grow: 1;
  overflow: hidden;
  overflow-y: auto;
`

const StyledTableBody = styled(Table.Body)`
  cursor: pointer;
`

const StyledTableRow = styled(Table.Row)`
  transition: background-color 300ms;
`
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
      activeStartIndex,
      activeEndIndex,
      onClickRow,
    } = this.props
    return (
      <Wrapper innerRef={this.scrollRef}>
        <Table selectable fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width='1'>Identity</Table.HeaderCell>
              <Table.HeaderCell width='1'>Type</Table.HeaderCell>
              <Table.HeaderCell width='1'>Timestamp</Table.HeaderCell>
              <Table.HeaderCell width='1'>Trace ID</Table.HeaderCell>
              <Table.HeaderCell width='1'>Span ID</Table.HeaderCell>
              <Table.HeaderCell width='1'>Parent ID</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <StyledTableBody>
            {events && events.map((event, i) => (
              <StyledTableRow
                key={event.id}
                active={i <= activeEndIndex && i >= activeStartIndex}
                onClick={() => onClickRow(event, i)}
                >
                <Table.Cell>{event.meta.service}</Table.Cell>
                <Table.Cell>{(event.payload as IHttpPayload | IKafkaPayload).type}</Table.Cell>
                <Table.Cell>{moment(event.meta.timestamp).format('HH:mm:ss')}</Table.Cell>
                <Table.Cell>{event.meta.traceId}</Table.Cell>
                <Table.Cell>{event.meta.spanId}</Table.Cell>
                <Table.Cell>{event.meta.parentId}</Table.Cell>
              </StyledTableRow>
            ))}
          </StyledTableBody>
        </Table>

      </Wrapper>
    )
  }
}
