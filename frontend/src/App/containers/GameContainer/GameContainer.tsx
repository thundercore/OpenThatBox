import React from 'react'
import Game from '../../components/GameMap/GameMap'
import { Box } from '@material-ui/core'
import CharactersMap from '../../components/CharactersMap/CharactersMap'
import UserCharacter from '../../components/UserCharacter/UserCharacter'

interface IGameContainerProps {}

export default React.memo(function GameContainer(props: IGameContainerProps) {
  return (
    <Box>
      <Box width={800} margin={'auto'} position={'relative'}>
        <Game size={10} />
        <CharactersMap
          characters={[{ x: 0, y: 1, address: 'fdsafasd' }]}
          size={10}
        />
        <UserCharacter character={{ x: 5, y: 5, address: 'fdsfs' }} size={10} />
      </Box>
    </Box>
  )
})
