import React, { ReactNode, useContext } from 'react'
import { useContractState } from '../../hooks/useContractState'

interface IGameContextProps {
  children: ReactNode
}

export interface ICharacter {
  x: number
  y: number
  address: string
  initialized: boolean
  total: number
}

export interface IGameContext {
  move(direction: Direction): any
  moveCell(x: number, y: number): any
  setPosition(x: number, y: number): any
  canMove(x: number, y: number): boolean
  currentUser: ICharacter
  size: number
  isLoading: boolean
  error: boolean
  characters: { [key: string]: ICharacter }
}

export enum Direction {
  Left,
  Right,
  Down,
  Up,
}
export enum GameState {
  Constructed,
  Started,
  Ended,
}

const initialChar = {
  total: 0,
  x: 0,
  y: 0,
  address: 'fake',
  initialized: false,
}
const GameContext = React.createContext<IGameContext>({
  move: (direction) => {},
  moveCell: (x, y) => {},
  setPosition: (x, y) => {},
  canMove: (x, y) => true,
  characters: {},
  currentUser: initialChar,
  size: 0,
  isLoading: true,
  error: false,
})

export default function GameProvider({ children }: IGameContextProps) {
  const {
    characters,
    size,
    currentUser,
    error,
    gameState,
    setCurrentUser,
    isLoading,
    contract,
  } = useContractState()

  const setPosition = (x: number, y: number) => {
    if (!currentUser.initialized) {
      setCurrentUser({
        ...currentUser,
        x,
        y,
        initialized: true,
      })
      contract.setPosition(x, y).catch((err: any) => {
        setCurrentUser({
          ...currentUser,
          initialized: false,
        })
      })
    }
  }

  const canMove = (x: number, y: number) => {
    // if (currentUser.initialized) {
    return (
      Math.abs(currentUser.x - x) + Math.abs(currentUser.y - y) === 1 &&
      x >= 0 &&
      y >= 0 &&
      x < size &&
      y < size
    )
    // } else {
    //   return x === 0 || y === 0 || (x === size - 1 || y === size - 1)
    // }
  }

  const moveCell = (newX: number, newY: number) => {
    const { x, y } = currentUser
    if (x === newX - 1) {
      handleMove(Direction.Right)
    } else if (x == newX + 1) {
      handleMove(Direction.Left)
    } else if (y == newY - 1) {
      handleMove(Direction.Down)
    } else if (y == newY + 1) {
      handleMove(Direction.Up)
    }
  }

  const handleMove = (direction: Direction) => {
    const { x, y } = currentUser
    if (direction === Direction.Down && canMove(x, y + 1)) {
      setCurrentUser({ ...currentUser, y: y + 1 })
      contract.move(Direction.Down).catch(() => {
        setCurrentUser({ ...currentUser })
      })
    } else if (direction === Direction.Up && canMove(x, y - 1)) {
      setCurrentUser({ ...currentUser, y: y - 1 })
      contract.move(Direction.Up).catch(() => {
        setCurrentUser({ ...currentUser })
      })
    } else if (direction === Direction.Left && canMove(x - 1, y)) {
      setCurrentUser({ ...currentUser, x: x - 1 })
      contract.move(Direction.Left).catch((e: any) => {
        setCurrentUser({ ...currentUser })
      })
    } else if (direction === Direction.Right && canMove(x + 1, y)) {
      setCurrentUser({ ...currentUser, x: x + 1 })
      contract.move(Direction.Right).catch((d: any) => {
        setCurrentUser({ ...currentUser })
      })
    }
  }

  return (
    <GameContext.Provider
      value={{
        canMove,
        moveCell,
        setPosition,
        move: handleMove,
        characters,
        isLoading,
        currentUser,
        size,
        error,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)
