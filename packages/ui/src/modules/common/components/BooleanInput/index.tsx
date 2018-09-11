import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import { Checkbox } from 'semantic-ui-react';

export const BooleanInput: React.SFC<FieldRenderProps> = ({
  input,
  meta,
  ...rest
}) => {
  return (
    <Checkbox
      {...rest}
      checked={input.value}
      onChange={(_, { checked }) => input.onChange(checked)}
    />
  )
}
