import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import GameCell from '../GameCell/GameCell'

const useStyles = makeStyles<Theme, IGameProps>((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      gridAutoRows: '1fr',
      '& > *:first-child': {
        gridRow: '1/1',
        gridColumn: '1/1',
      },
      '&::before': {
        content: '""',
        width: 0,
        paddingBottom: '100%',
        gridRow: '1/1',
        gridColumn: '1/1',
      },
    },
    cell: {
      border: '1px solid green',
    },
  })
)

interface IGameProps {
  size: number
}

export default React.memo(function Game(props: IGameProps) {
  const [map, setMap] = useState<number[][]>(() =>
    Array(props.size)
      .fill(0)
      .map((x) => Array(props.size).fill(0))
  )
  const classes = useStyles(props)

  const onClick = (row: number, column: number) => {
    alert(`${row} ${column}`)
  }

  const renderRows = (row: number[], rowIdx: number) => {
    return row.map((cell: number, cellIdx: number) => (
      <div className={classes.cell} key={rowIdx}>
        <GameCell
          key={cellIdx}
          value={cell}
          row={rowIdx}
          column={cellIdx}
          onClick={onClick}
        />
      </div>
    ))
  }
  return (
    <div
      className={classes.container}
      style={{
        gridTemplateColumns: `repeat(${props.size}, ${100 /
          props.size}% [col-start])`,
      }}
    >
      {map.map(renderRows)}
    </div>
  )
})
