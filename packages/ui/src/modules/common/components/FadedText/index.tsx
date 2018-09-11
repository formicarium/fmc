import React from 'react'

export const FadedText: React.SFC<{faded?: boolean}> = ({
  children,
  faded,
}) => (
  <span style={{color: faded ? '#ccc' : 'inherit'}}>
    {children}
  </span>
)
