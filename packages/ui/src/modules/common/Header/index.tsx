import React from 'react'
import { Header as SemanticHeader, HeaderProps } from 'semantic-ui-react';

export const Header: React.SFC<HeaderProps & {noMargin?: boolean}> = ({
  noMargin,
  style,
  ...props
}) => (
  <SemanticHeader {...props} style={{...style, margin: noMargin ? 0 : 'inherit'}}/>
)
