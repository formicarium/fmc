import React from 'react'
import electron, { OpenDialogOptions } from 'electron'
import { Nullable } from '@formicarium/common';
import { Button, Segment } from 'semantic-ui-react';
import { FieldRenderProps } from 'react-final-form';

export interface IFolderPathInputProps {
  options?: OpenDialogOptions
  emptyValueLabel?: string
  withValueLabel?: string
}

const defaultOptions = {
  properties: ['openDirectory'],
  defaultPath: process.env.NU_HOME
} as OpenDialogOptions

export class FolderPathInput extends React.Component<FieldRenderProps & IFolderPathInputProps> {
  private pickFolderPath = (): Nullable<string> => {
    const path = electron.remote.dialog.showOpenDialog(this.props.options || defaultOptions);
    if (path && path.length) {
      return path[0]
    }
    return null
  }

  private handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const folderPath = this.pickFolderPath()
    this.props.input.onChange(folderPath)
  }

  public render() {
    const {
      input,
      emptyValueLabel,
      withValueLabel,
    } = this.props
    return (
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        {input.value && (
          <div style={{flexGrow: 1, paddingRight: 20}}>
            <Segment tertiary>{input.value}</Segment>
          </div>
        )}
        <div>
          <Button
            onClick={this.handleClick}>
            {input.value ? (emptyValueLabel || 'Change folder') : (withValueLabel || 'Select folder')}
          </Button>
        </div>

      </div>
    )
  }
}
