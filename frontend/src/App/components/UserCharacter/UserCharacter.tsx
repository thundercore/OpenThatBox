import React from 'react'
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import Blockie from '../Blockie/Blockie'

const useStyles = makeStyles<Theme, IUserCharacterProps>((theme: Theme) =>
  createStyles({
    character: {
      position: 'absolute',
      transition: theme.transitions.create('all', { duration: 1000 }),
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
}

export default React.memo(function UserCharacter(props: IUserCharacterProps) {
  const classes = useStyles(props)
  const { character } = props
  const left = (100 / props.size) * character.x
  const right = (100 / props.size) * character.y
  const style = {
    left: `${left}%`,
    top: `${right}%`,
  }
  return (
    <Box top={0} position={'absolute'} width={'100%'} height={'100%'}>
      <Blockie
        key={character.address}
        address={character.address}
        className={classes.character}
        style={style}
      />
    </Box>
  )
})
