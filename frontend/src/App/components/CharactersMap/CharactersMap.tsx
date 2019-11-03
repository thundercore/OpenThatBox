import React from 'react'
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import Blockie from '../Blockie/Blockie'

const useStyles = makeStyles<Theme, ICharactersMapProps>((theme: Theme) =>
  createStyles({
    character: {
      position: 'absolute',
      transition: theme.transitions.create('all', { duration: 1000 }),
    },
  })
)

interface ICharacter {
  x: number
  y: number
  address: string
}

interface ICharactersMapProps {
  characters: ICharacter[]
  size: number
}

export default React.memo(function CharactersMap(props: ICharactersMapProps) {
  const classes = useStyles(props)

  return (
    <Box top={0} position={'absolute'} width={'100%'} height={'100%'}>
      {props.characters.map((character) => {
        const left = (100 / props.size) * character.x
        const right = (100 / props.size) * character.y
        const style = {
          left: `${left}%`,
          top: `${right}%`,
        }

        return (
          <Blockie
            key={character.address}
            address={character.address}
            className={classes.character}
            style={style}
          />
        )
      })}
    </Box>
  )
})
