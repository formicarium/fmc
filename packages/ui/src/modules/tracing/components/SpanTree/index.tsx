import React from 'react'
import TreeView from 'react-treeview'
import { IHashMap } from '@formicarium/common';
import { getTreeNodeForSpan } from '~/modules/tracing/components/SpanTree/logic';
import { IEventMessage } from '@formicarium/ui/src/modules/tracing/model/event';
import memoize from 'memoize-one';

export interface ITreeNode {
  id: string
  label: string
  children?: ITreeNode[]
}

export interface INodeLabelProps {
  label: string
  onClick: () => void
  selected: boolean
}
const NodeLabelView: React.SFC<INodeLabelProps> = ({
  label,
  onClick,
  selected,
}) => (
  <span onClick={onClick} style={{backgroundColor: selected ? '#d3d3d3' : 'inherit', cursor: 'pointer', fontFamily: 'Open Sans', fontSize: 20}}>
  {label}
  </span>
)

export interface ILeafViewProps {
  node: ITreeNode,
  selected: boolean
  onClick: () => void
}

const LeafLabelView: React.SFC<ILeafViewProps> = ({
  node,
  selected,
  onClick,
}) => (
  <span onClick={onClick} style={{backgroundColor: selected ? '#d3d3d3' : 'inherit', cursor: 'pointer', display: 'block', fontFamily: 'Open Sans', fontSize: 20}}>
    {node.label}
  </span>
)

export interface INodeViewProps {
  node: ITreeNode
  openMap: IHashMap<boolean>
  selectedMap: IHashMap<boolean>
  onToggleNode: (node: ITreeNode, open: boolean) => void
  onClick: (node: ITreeNode, selected: boolean) => void;
}

const TreeNode: React.SFC<INodeViewProps> = ({
  node,
  onClick,
  onToggleNode,
  openMap,
  selectedMap,
}) => (
  <TreeView
    key={node.id}
    nodeLabel={<NodeLabelView label={node.label} selected={selectedMap[node.id]} onClick={() => onClick(node, !selectedMap[node.id])} /> }
    collapsed={!openMap[node.id]}
    onClick={() => {
      onToggleNode(node, !openMap[node.id])
    }}>
    {node.children && node.children.map((child) => {
      if (child.children && child.children.length > 0) {
        return (
          <TreeNode
            key={child.id}
            node={child}
            onClick={onClick}
            onToggleNode={onToggleNode}
            openMap={openMap}
            selectedMap={selectedMap}
          />
        )
      }

      return (
        <LeafLabelView
          key={child.id}
          onClick={() => onClick(child, !selectedMap[child.id])}
          node={child}
          selected={selectedMap[child.id]}
        />
      )
    })}
  </TreeView>
)

export interface ISpanTreeState {
  openMap: IHashMap<boolean>
  selectedMap: IHashMap<boolean>
}

export interface ISpanTreeProps {
  messages: IEventMessage[]
}
export class SpanTree extends React.Component<ISpanTreeProps, ISpanTreeState> {
  public state = {
    openMap: {
      root: true,
    },
    selectedMap: {
      root: true,
    },
  }
  private handleClick = (node: ITreeNode, selected: boolean) => {
    this.setState((state) => ({
      selectedMap: {
        ...state.selectedMap,
        [node.id]: selected,
      },
    }))
  }

  private calculateTree = memoize(
    (messages: IEventMessage[]) => getTreeNodeForSpan(messages, 'O'),
  )

  private handleToggleNode = (node: ITreeNode, open: boolean) => {
    console.log(node)
    console.log(open)
    this.setState((state) => ({
      openMap: {
        ...state.openMap,
        [node.id]: open,
      },
    }))
  }

  public render() {
    return (
      <TreeNode
        openMap={this.state.openMap}
        selectedMap={this.state.selectedMap}
        node={this.calculateTree(this.props.messages)}
        onClick={this.handleClick}
        onToggleNode={this.handleToggleNode}
      />
    )
  }
}
