import React from 'react'
import { IEventMessage, EventKind } from '~/modules/tracing/model/event';
import { MESSAGES } from '~/modules/tracing/mock/events';
import * as R from 'ramda'

export interface IFlameGraphNode {
  name: string
  start: number
  end: number
  depth: number;
  color?: string
  backgroundColor?: string
  childNodes?: IFlameGraphNode[]
}

const getFlameGraphNodeForSpan = (messages: IEventMessage[], spanId: string): IFlameGraphNode => {
  const childrenMessages = messages.filter((message) => message.meta.parentId === spanId)
  const messagesWithSpan = messages.filter((message) => message.meta.spanId === spanId)

  const start = messagesWithSpan.find((message) => message.meta.kind === EventKind.START)
  const end = messagesWithSpan.find((message) => message.meta.kind === EventKind.END)
  const startTimestamp = start ? start.meta.timestamp : 0
  const endTimestamp = end ? end.meta.timestamp : 0

  const childSpans = R.uniqBy((message) => message.meta.spanId , childrenMessages)
    .map((message) => message.meta.spanId)

  return {
    name: spanId,
    start: startTimestamp,
    end: endTimestamp,
    childNodes: childSpans.map((span) => getFlameGraphNodeForSpan(messages, span)),
    depth: 0,
  }
}

const flameGraphData = getFlameGraphNodeForSpan(MESSAGES, 'O')
console.log(flameGraphData)

// const FlameGraphNode: React.SFC<{multiplier: number, node: IFlameGraphNode, root?: boolean}> = ({
//   node,
//   multiplier,
//   root,
// }) => (
//   <Fragment>
//     {!root && (
//     <div style={{
//       top: (node.depth) * 30,
//       height: 30,
//       fontSize: 8,
//       borderRadius: 2,
//       position: 'absolute',
//       left: node.start * multiplier,
//       border: '1px solid #333',
//       width: Math.max((node.end - node.start), 1) * multiplier,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: (node.end - node.start) === 0 ? 'steelblue' : 'tomato',
//     }}>
//       {node.name} [{node.depth}]
//     </div>
//     )}
//     {node.childNodes && node.childNodes.map((childNode, i) => (
//       <FlameGraphNode
//         node={childNode}
//         multiplier={multiplier}
//       />
//     ))}
//   </Fragment>
// )

interface ISpanBarProps {
  left: number,
  width: number,
  top: number;
  label: string
  backgroundColor: string,
}

interface ISpanBar {
  spanId: string
  start: number
  end: number
}
const SpanBar: React.SFC<ISpanBarProps> = ({
  left,
  width,
  top,
  label,
  backgroundColor,
}) => (
  <div
    style={{
      position: 'absolute',
      left,
      width,
      top,
      backgroundColor,
      fontSize: 10,
      height: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '4px solid #d3d3d3',
      borderRadius: 10,
      color: '#FFF',
    }}
  >
    {label}
  </div>
)

const getStartAndEnd = (messages: IEventMessage[]): {start: number, end: number} => {
  const startMessage = messages.find((message) => message.meta.kind === EventKind.START)
  const endMessage = messages.find((message) => message.meta.kind === EventKind.END)

  const start = startMessage ? startMessage.meta.timestamp : 0
  const end = endMessage ? endMessage.meta.timestamp : Infinity
  return {
    start,
    end,
  }
}

const messagesToSpanBars = (messages: IEventMessage[]): ISpanBar[] => {
  const groups = R.pipe(
    R.groupBy((message: IEventMessage) => message.meta.spanId),
    R.toPairs,
    R.reduce((acc, [spanId, msgs]: [string, IEventMessage[]]) => ([
      ...acc, {
        spanId,
        ...getStartAndEnd(msgs),
      },
    ]), []),
    R.sortBy((a) => a.start),
  )(messages)

  return groups
}

const getMaxTimestamp = (spans: ISpanBar[]) => {
  const maxEnd =  R.pipe(
    R.filter((span: ISpanBar) => span.end !== Infinity),
    R.sortBy((span: ISpanBar) => -span.end) as any,
    R.head,
    R.prop('end') as any,
  )(spans as any) as number

  const maxStart =  R.pipe(
    R.filter((span: ISpanBar) => span.start !== -Infinity),
    R.sortBy((span: ISpanBar) => -span.start) as any,
    R.head as any,
    R.prop('start') as any,
  )(spans as any) as number

  const maxTimestamp = R.max(maxEnd, maxStart)
  return maxTimestamp
}

const spanBarsToLayout = (spans: ISpanBar[], width: number): ISpanBarProps[] => {
  const maxTimestamp = getMaxTimestamp(spans)
  const minStart = R.prop('start', R.head(R.sortBy((span) => span.start, spans)))

  const factor = width / (maxTimestamp - minStart)

  return spans.map((span, i) => {
    const realEnd = span.end === Infinity ? (maxTimestamp + 1) : span.end
    return {
      left: span.start * factor,
      width: Math.max((realEnd - span.start), 1) * factor,
      top: i * 30,
      label: span.spanId,
      backgroundColor: span.end === Infinity ? 'steelblue' : 'tomato',
    }
  })
}

const data = messagesToSpanBars(MESSAGES)

const VerticalLine: React.SFC<{left: number}> = ({
  left,
}) => (
  <div
    style={{
      backgroundColor: '#c3c3c3',
      position: 'absolute',
      width: 1,
      top: 0,
      bottom: 0,
      left,
    }}
  />
)
const WIDTH = 1200

const depth = (x: string) => {
  const z = R.length(R.split('.', x))
  console.log(z)
  return z
}

export class FMCFlameGraph extends React.Component {
  public render() {
    const maxTimestamp = getMaxTimestamp(data)
    const sortedArray = R.sortBy((x) => depth(x.label), spanBarsToLayout(data, WIDTH))
    console.log(sortedArray)
    return null
    return (
      <div style={{position: 'relative', width: WIDTH + (WIDTH / maxTimestamp), height: 300, backgroundColor: '#d3d3d3'}}>
        {R.range(1, maxTimestamp + 1).map((i) => (
          <VerticalLine
            left={i * (WIDTH / maxTimestamp)}
            key={i}
          />
        ))}
        {data && sortedArray.map((bar, i) => (
          <SpanBar
            key={i}
            {...bar}
          />
        ))}
      </div>
    );
  }
}
