import React from 'react'
import { IErrorComponentProps } from '~/modules/common/render-props/PromiseManager';
import { Button, Image, Segment } from 'semantic-ui-react';

const IMG_SRC = 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png'

export const DisplayError: React.SFC<IErrorComponentProps> = ({
  error,
  retry,
}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <Image
      size='small'
      src={IMG_SRC}
    />
    <Segment secondary>
      {error.toString()}
    </Segment>
    <Button onClick={retry}>
      Tentar novamente
    </Button>
  </div>
)
