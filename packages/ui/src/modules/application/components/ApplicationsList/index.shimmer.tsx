import React from 'react'
import R from 'ramda'
import { ApplicationPlaceholder } from '~/modules/application/components/Application/index.shimmer';

export const ApplicationListPlaceholder: React.SFC<{n: number}> = ({
  n,
}) => (
  <div>
    {R.range(0, n).map((i) => <ApplicationPlaceholder key={i} style={{marginBottom: 14}} />)}
  </div>
)
