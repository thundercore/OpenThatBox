import React, { ReactNode, useContext, useState } from 'react'
import { Signer, Wallet } from 'ethers'
import {
  JsonRpcProvider,
  Web3Provider as EthersProvider,
} from 'ethers/providers'
import { fromSeed } from 'ethers/utils/hdnode'
import { sha256, toUtf8Bytes } from 'ethers/utils'

interface IGameContextProps {
  children: ReactNode
}

export interface ICharacter {
  x: number
  y: number
  address: string
}

export interface IGameContext {
  move(direction: Direction): any
  moveCell(x: number, y: number): any
  canMove(x: number, y: number): boolean
  currentUser: ICharacter
  size: number
  // signer?: Signer
  // provider: JsonRpcProvider
  // address: string
}

export enum Direction {
  Left,
  Right,
  Down,
  Up,
}

const GameContext = React.createContext<IGameContext>({
  move: (direction) => {},
  moveCell: (x, y) => {},
  canMove: (x, y) => true,
  currentUser: {
    x: 0,
    y: 0,
    address: 'fake',
  },
  size: 0,
  // setCode: (code: string) => {},
  // provider: new JsonRpcProvider(''),
  // address: '',
  // signer: undefined,
})

const size = 10

export default function GameProvider({ children }: IGameContextProps) {
  const [currentUser, setCurrentUser] = useState({
    x: 0,
    y: 0,
    address: 'fake',
  })

  const canMove = (x: number, y: number) => {
    return (
      Math.abs(currentUser.x - x + currentUser.y - y) === 1 &&
      x >= 0 &&
      y >= 0 &&
      x < size &&
      y < size
    )
  }

  const moveCell = (x: number, y: number) => {
    setCurrentUser({ ...currentUser, x, y })
  }

  const handleMove = (direction: Direction) => {
    const { x, y } = currentUser
    if (direction === Direction.Down && canMove(x, y + 1)) {
      setCurrentUser({ ...currentUser, y: y + 1 })
    } else if (direction === Direction.Up && canMove(x, y - 1)) {
      setCurrentUser({ ...currentUser, y: y - 1 })
    } else if (direction === Direction.Left && canMove(x - 1, y)) {
      setCurrentUser({ ...currentUser, x: x - 1 })
    } else if (direction === Direction.Right && canMove(x + 1, y)) {
      setCurrentUser({ ...currentUser, x: x + 1 })
    }
  }

  return (
    <GameContext.Provider
      value={{
        canMove,
        moveCell,
        move: handleMove,
        currentUser,
        size,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)
