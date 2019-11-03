import React, { useEffect } from 'react'
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import Blockie from '../Blockie/Blockie'
import { Direction } from '../../contexts/GameContext/GameContext'

const useStyles = makeStyles<Theme, IUserCharacterProps>((theme: Theme) =>
  createStyles({
    character: {
      position: 'absolute',
      transition: theme.transitions.create('all', { duration: 1000 }),
    },
    container: {
      pointerEvents: 'none',
    },
  })
)

interface IUserCharacterProps {
  character: {
    x: number
    y: number
    address: string
  }
  size: number
  move(direction: Direction): any
}

export default React.memo(function UserCharacter(props: IUserCharacterProps) {
  const classes = useStyles(props)
  const { character, move } = props
  const left = (100 / props.size) * character.x
  const right = (100 / props.size) * character.y
  const style = {
    left: `${left}%`,
    top: `${right}%`,
  }

  const keyPressHandler = React.useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === 'ArrowDown' || evt.key == 's') {
        move(Direction.Down)
      } else if (evt.key === 'ArrowUp' || evt.key == 'w') {
        move(Direction.Up)
      } else if (evt.key === 'ArrowLeft' || evt.key == 'a') {
        move(Direction.Left)
      } else if (evt.key === 'ArrowRight' || evt.key == 'd') {
        move(Direction.Right)
      }
    },
    [move]
  )

  useEffect(
    () => {
      window.addEventListener('keydown', keyPressHandler)
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener('keydown', keyPressHandler)
      }
    },
    [keyPressHandler]
  )

  return (
    <Box
      top={0}
      position={'absolute'}
      width={'100%'}
      height={'100%'}
      className={classes.container}
    >
      <Blockie
        key={character.address}
        address={character.address}
        className={classes.character}
        style={style}
      />
    </Box>
  )
})
