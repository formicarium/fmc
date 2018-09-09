import { ITreeNode } from './../../components/SpanTree/index';
import { IHashMap } from '@formicarium/common';
import { Container } from 'unstated';

export interface IExplorerState {
  selectedNodesMap: IHashMap<boolean>
  openNodesMap: IHashMap<boolean>
  spanFilter: string
}
export class ExplorerState extends Container<IExplorerState> {
  public state = {
    selectedNodesMap: {},
    openNodesMap: {},
    spanFilter: '',
  }

  public selectNode = (node: ITreeNode, selected: boolean) => {
    this.setState({
      spanFilter: node.label,
      selectedNodesMap: {
        [node.id]: true,
      },
    })
  }

  public setNodeOpenState = (node: ITreeNode, open: boolean) => {
    console.log(node, open)
    this.setState((state) => ({
      openNodesMap: {
        ...state.openNodesMap,
        [node.id]: open,
      },
    }))
  }
}
