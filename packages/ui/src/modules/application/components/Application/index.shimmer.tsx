import React from 'react'
import ContentLoader from 'react-content-loader'

export const ApplicationPlaceholder: React.SFC<{style?: any}> = ({
  style,
}) => (
  <ContentLoader height={280} width={1000} style={{height: 280, width: '100%', ...style}} />
)
