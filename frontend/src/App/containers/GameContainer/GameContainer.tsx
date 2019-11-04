import React from 'react'
import Game from '../../components/GameMap/GameMap'
import { Box } from '@material-ui/core'
import CharactersMap from '../../components/CharactersMap/CharactersMap'
import UserCharacter from '../../components/UserCharacter/UserCharacter'
import { useGameContext } from '../../contexts/GameContext/GameContext'

interface IGameContainerProps {}

export default React.memo(function GameContainer(props: IGameContainerProps) {
  const { currentUser, characters, canMove, move, size } = useGameContext()
  return (
    <Box mt={5}>
      <Box width={800} margin={'auto'} position={'relative'}>
        <Game size={size} canMove={canMove} />
        <CharactersMap characters={characters} size={size} />
        <UserCharacter character={currentUser} size={size} move={move} />
      </Box>
    </Box>
  )
})
