import React from 'react'
import { Icon } from 'semantic-ui-react';
import { PromiseButton } from '~/modules/common/components/PromiseButton';

export interface IDevspaceSettings {
  onPressDeleteNamespace: () => void;
}
export const DevspaceSettings: React.SFC<IDevspaceSettings> = ({
  onPressDeleteNamespace,
}) => (
  <div>
    <PromiseButton color='red' onClick={onPressDeleteNamespace}>
      <Icon name='trash' />
      Delete Devspace
    </PromiseButton>
  </div>
)
