import { useEffect, useState } from 'react'
import { useWeb3Context } from '../contexts/Web3Context/Web3Context'
import { useMinerContractContext } from '../contexts/MinerContractContext/MinerContractContext'
import { GameState, ICharacter } from '../contexts/GameContext/GameContext'
import { parseMinerLog } from '../utils/parseMinerLog'

interface ICharacterMap {
  [key: string]: ICharacter
}

export function useContractState() {
  const [characters, setCharacter] = useState<ICharacterMap>({})

  const [isLoading, setLoading] = useState(true)
  const [size, setSize] = useState(0)
  const [gameState, setGameState] = useState(GameState.Constructed)
  const [error, setError] = useState(false)
  const { address } = useWeb3Context()
  const [currentUser, setCurrentUser] = useState({
    total: 0,
    x: 0,
    y: 0,
    address,
    initialized: false,
  })

  const contractContext = useMinerContractContext()
  const contract = contractContext.contract!

  // get historical logs
  useEffect(() => {
    const playerJoinedFilter = contract.filters.PlayerJoined()
    //@ts-ignore
    playerJoinedFilter.fromBlock = '0x0'
    //@ts-ignore
    playerJoinedFilter.toBlock = 'latest'
    contract.provider.getLogs(playerJoinedFilter).then((logs) => {
      const newChars: ICharacterMap = {}
      logs.forEach((log) => {
        const { values } = contract.interface.parseLog(log)
        const userAddress = values[0].toLowerCase()
        if (userAddress !== address) {
          newChars[address] = parseMinerLog(userAddress, values[1], values[2])
        }
      })

      const playerMovedFilter = contract.filters.PlayerMoved()
      //@ts-ignore
      playerMovedFilter.fromBlock = '0x0'
      //@ts-ignore
      playerMovedFilter.toBlock = 'latest'
      contract.provider.getLogs(playerMovedFilter).then((logs) => {
        logs.forEach((log) => {
          const { values } = contract.interface.parseLog(log)
          const userAddress = values[0].toLowerCase()
          if (userAddress !== address) {
            newChars[address] = parseMinerLog(
              userAddress,
              values[1],
              values[2],
              values[3],
              values[4]
            )
          }
        })
        setCharacter({
          ...characters,
          ...newChars,
        })
      })
    })

    contract.on('PlayerMoved', (userAddress, x, y, value, total) => {
      userAddress = userAddress.toLowerCase()
      if (userAddress !== address) {
        const char = parseMinerLog(userAddress, x, y, value, total)
        setCharacter({
          [userAddress]: char,
        })
      }
    })
    contract.on('PlayerJoined', (userAddress, x, y) => {
      userAddress = userAddress.toLowerCase()
      if (userAddress !== address) {
        const char = parseMinerLog(userAddress, x, y)
        if (!characters[userAddress]) {
          setCharacter({
            [userAddress]: char,
          })
        }
      }
    })
  }, [])

  useEffect(() => {
    const promises = [
      contract.playerPositions(address),
      contract.size(),
      contract.state(),
    ]
    Promise.all(promises)
      .then(([position, size, state]) => {
        setGameState(state)
        setLoading(false)
        setSize(size.toNumber())
        setCurrentUser({
          ...currentUser,
          x: position.x.toNumber(),
          y: position.y.toNumber(),
          total: position.total.toNumber(),
          initialized: position.initialized,
        })
      })
      .catch(() => {
        setError(true)
      })
  }, [])

  return {
    setCurrentUser,
    characters,
    size,
    currentUser,
    isLoading,
    gameState,
    error,
    contract,
  }
}
