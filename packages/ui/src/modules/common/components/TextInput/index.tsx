import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import { Input } from 'semantic-ui-react'

export const TextInput: React.SFC<FieldRenderProps> = ({
  input,
  meta,
  ...rest
}) => {
  return (
    <Input
      {...rest}
      error={!!meta.error}
      value={input.value}
      onChange={(_, { value }) => input.onChange(value)}
    />
  )
}
