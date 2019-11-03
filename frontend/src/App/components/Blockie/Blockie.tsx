import React from 'react'
//@ts-ignore
import * as blockies from 'blockies'

interface IBlockieProps
  extends React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    > {
  address: string
}

export default React.memo(function Blockie(props: IBlockieProps) {
  const { address, ...rest } = props
  const canvas = blockies({
    seed: address,
    color: '#fff',
    bgcolor: '#00000000',
    size: 6,
    scale: 4,
    spotcolor: '#00000000',
  })
  return <img {...rest} src={canvas.toDataURL()} />
})
