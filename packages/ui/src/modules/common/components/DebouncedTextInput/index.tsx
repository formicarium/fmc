import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import { Input } from 'semantic-ui-react'
import { WithDebouncedValue } from '~/modules/common/render-props/WithDebouncedValue';

export const DebouncedTextInput: React.SFC<FieldRenderProps> = ({
  input,
  meta,
  ...rest
}) => {
  return (
    <WithDebouncedValue onChange={input.onChange} value={input.value}>
      {(onChange, localValue) => (
        <Input
          {...rest}
          error={!!meta.error}
          value={localValue}
          onChange={(_, { value }) => onChange(value)}
        />
      )}
    </WithDebouncedValue>
  )
}
