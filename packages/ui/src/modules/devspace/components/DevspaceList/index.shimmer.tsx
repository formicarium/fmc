import React from 'react'
import R from 'ramda'
import ContentLoader from 'react-content-loader'

export const DevspaceListItemPlaceholder: React.SFC<{style?: any}> = ({
  style,
}) => (
  <ContentLoader height={46} width={900} style={{height: 46, width: 900, ...style}} />
)

export const DevspaceListPlaceholder: React.SFC<{n: number}> = ({
  n,
}) => (
  <div style={{marginTop: 14}}>
    {R.range(0, n).map((i) => <DevspaceListItemPlaceholder key={i} style={{marginBottom: 8}} />)}
  </div>
)
