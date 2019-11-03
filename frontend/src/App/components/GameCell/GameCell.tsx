import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles<Theme, IGameCellProps>((theme: Theme) =>
  createStyles({
    cell: {
      backgroundColor: 'grey',
      width: '100%',
      height: '100%',
    },
  })
)

interface IGameCellProps {
  value: number
  row: number
  column: number
  onClick(row: number, column: number): void
}

export default React.memo(function GameCell(props: IGameCellProps) {
  const classes = useStyles(props)

  return (
    <div
      className={classes.cell}
      onClick={() => props.onClick(props.row, props.column)}
    />
  )
})
