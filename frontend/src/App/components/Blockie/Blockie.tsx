import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
//@ts-ignore
import * as blockies from 'blockies'

const useStyles = makeStyles<Theme, IBlockieProps>((theme: Theme) =>
  createStyles({})
)

interface IBlockieProps {
  address: string
  className?: string
  width: number
  height: number
}

export default React.memo(function Blockie(props: IBlockieProps) {
  const classes = useStyles(props)
  const canvas = blockies({
    seed: props.address,
    color: '#fff',
    bgcolor: '#00000000',
    size: 6,
    scale: 4,
    spotcolor: '#00000000',
  })
  return (
    <img
      src={canvas.toDataURL()}
      width={props.width}
      height={props.height}
      className={props.className}
    />
  )
})
