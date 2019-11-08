import React, { useMemo } from 'react'
//@ts-ignore
import * as blockies from 'blockies'

interface IBlockieProps
  extends React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    > {
  address: string
  color: string
  spot?: boolean
}

export default React.memo(function Blockie(props: IBlockieProps) {
  const { address, color, spot, ...rest } = props
  const data = useMemo(
    () =>
      blockies({
        seed: address,
        color,
        bgcolor: '#00000000',
        size: 6,
        scale: 4,
        spotcolor: spot ? undefined : '#00000000',
      }).toDataURL(),
    [address]
  )
  return <img {...rest} src={data} />
})
