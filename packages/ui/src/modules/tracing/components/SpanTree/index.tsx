import React, { CSSProperties } from 'react'
import TreeView from 'react-treeview'
import { IHashMap } from '@formicarium/common';
import { getTreeNodeForSpan } from '~/modules/tracing/components/SpanTree/logic';
import memoize from 'memoize-one';
import { IEvent } from '@formicarium/ui/src/modules/tracing/graphql/queries/events';

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
  <div onClick={onClick} style={{fontWeight: selected ? 'bold' : 'normal', cursor: 'pointer', fontFamily: 'Open Sans', fontSize: 20, marginBottom: 10, display: 'inline'}}>
  {label}
  </div>
)

export interface ILeafViewProps {
  node: ITreeNode,
  selected: boolean
  onClick: () => void
  style?: CSSProperties
}

export interface INodeViewProps {
  node: ITreeNode
  openMap: IHashMap<boolean>
  selectedMap: IHashMap<boolean>
  onOpenNode: (node: ITreeNode, open: boolean) => void
  onSelectNode: (node: ITreeNode, selected: boolean) => void;
}

const TreeNode: React.SFC<INodeViewProps> = ({
  node,
  onSelectNode,
  onOpenNode,
  openMap,
  selectedMap,
}) => (
  <TreeView
    key={node.id}
    nodeLabel={<NodeLabelView label={node.label} selected={selectedMap[node.id]} onClick={() => onSelectNode(node, !selectedMap[node.id])} /> }
    collapsed={!openMap[node.id] && node.children.length > 0}
    // style={{padding: 4}}
    onClick={() => {
      onOpenNode(node, !openMap[node.id])
    }}>
    {node.children && node.children.map((child) => (
      <TreeNode
        key={child.id}
        node={child}
        onSelectNode={onSelectNode}
        onOpenNode={onOpenNode}
        openMap={openMap}
        selectedMap={selectedMap}
      />
    ))}
  </TreeView>
)

export interface ISpanTreeProps {
  events: IEvent[]
  onOpenNode: (node: ITreeNode, open: boolean) => void
  onSelectNode: (node: ITreeNode, selected: boolean) => void;
  openMap: IHashMap<boolean>
  selectedMap: IHashMap<boolean>
}
export class SpanTree extends React.Component<ISpanTreeProps> {
  private calculateTree = memoize(
    (events: IEvent[]) => getTreeNodeForSpan(events, 'DEFAULT'),
  )

  public render() {
    const node = this.calculateTree(this.props.events)
    console.log(this.props.events)
    console.log(node)
    return (
      <TreeNode
        node={node}
        openMap={this.props.openMap}
        selectedMap={this.props.selectedMap}
        onSelectNode={this.props.onSelectNode}
        onOpenNode={this.props.onOpenNode}
      />
    )
  }
}
