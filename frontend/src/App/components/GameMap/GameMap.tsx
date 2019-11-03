import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import GameCell from '../GameCell/GameCell'
import { Direction } from '../../contexts/GameContext/GameContext'

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
  moveCell(x: number, y: number): any
  canMove(x: number, y: number): boolean
  size: number
}

export default React.memo(function Game(props: IGameProps) {
  const { moveCell, size, canMove } = props
  const [map, setMap] = useState<number[][]>([[]])
  useEffect(
    () => {
      setMap(
        Array(props.size)
          .fill(0)
          .map((x) => Array(props.size).fill(0))
      )
    },
    [size]
  )

  const classes = useStyles(props)

  const renderRows = (row: number[], rowIdx: number) => {
    return row.map((cell: number, cellIdx: number) => (
      <div className={classes.cell} key={cellIdx + rowIdx}>
        <GameCell
          value={cell}
          row={rowIdx}
          column={cellIdx}
          canMove={canMove(cellIdx, rowIdx)}
          onClick={moveCell}
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
