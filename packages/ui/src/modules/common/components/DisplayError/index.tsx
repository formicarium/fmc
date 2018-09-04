import React from 'react'
import { IErrorComponentProps } from '~/modules/common/render-props/PromiseManager';
import { Button } from 'semantic-ui-react';

export const DisplayError: React.SFC<IErrorComponentProps> = ({
  error,
  retry,
}) => (
  <div>
    {error.toString()}
    <Button
      onClick={retry}
    >
      Tentar novamente
    </Button>
  </div>
)
