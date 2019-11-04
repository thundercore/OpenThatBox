import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles<Theme, IGameCellProps>((theme: Theme) =>
  createStyles({
    cell: {
      backgroundColor: 'grey',
      width: '100%',
      height: '100%',
    },
    valid: {
      backgroundColor: 'red',
    },
  })
)

interface IGameCellProps {
  value: number
  row: number
  column: number
  canMove: boolean
}

export default React.memo(function GameCell(props: IGameCellProps) {
  const classes = useStyles(props)
  return <div className={clsx(classes.cell, props.canMove && classes.valid)} />
})
