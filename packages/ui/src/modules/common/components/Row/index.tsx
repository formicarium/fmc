import React from 'react'

export const Row: React.SFC<{spaceBetween: boolean, centerVertical: boolean}> = ({
  children,
  spaceBetween,
  centerVertical,
}) => (
  <div style={{display: 'flex', flexDirection: 'row', alignItems: centerVertical ? 'center' : 'inherit', justifyContent: spaceBetween ? 'space-between' : 'inherit'}}>
    {children}
  </div>
)
