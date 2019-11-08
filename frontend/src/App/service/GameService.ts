import { Contract } from 'ethers'
import { parseMinerLog } from '../utils/parseMinerLog'
//@ts-ignore
import * as blockies from 'blockies'
import { BigNumber } from 'ethers/utils'

enum Tile {
  Unmined,
  Empty,
}
export interface ICharacter {
  image: string
  x: number
  y: number
  address: string
  initialized: boolean
  total: number
}

export enum Direction {
  Left,
  Right,
  Down,
  Up,
}

export class GameService {
  isMoving = false
  size: number = 0
  currentUser: ICharacter = {
    image: '',
    total: 0,
    x: 0,
    y: 0,
    address: 'fake',
    initialized: false,
  }
  characters: { [key: string]: ICharacter } = {}
  gameState: number = 0
  map: any[][] = []

  constructor(
    private readonly contract: Contract,
    private readonly address: string
  ) {}

  private createImage(address: string) {
    return blockies({
      seed: address,
      color: '#fff',
      bgcolor: '#00000000',
      size: 6,
      scale: 4,
      spotcolor: '#00000000',
    }).toDataURL()
  }

  async initialize() {
    const [position, size, state] = await Promise.all([
      this.contract.playerPositions(this.address),
      this.contract.size(),
      this.contract.state(),
    ])
    this.size = size.toNumber()
    this.makeMap(this.size)

    this.currentUser = {
      image: this.createImage(this.address),
      address: position.address,
      x: position.x.toNumber(),
      y: position.y.toNumber(),
      total: position.total.toNumber(),
      initialized: position.initialized,
    }

    this.map[this.currentUser.x][this.currentUser.y] = position.address

    this.gameState = state
    await this.loadHistoricalData()
    this.watchMovement()
  }

  private makeMap(size: number) {
    this.map = Array(size)
      .fill(Tile.Unmined)
      .map((x) => Array(size).fill(Tile.Unmined))
  }

  private watchMovement() {
    const handleEvent = (
      address: string,
      x: BigNumber,
      y: BigNumber,
      val?: BigNumber,
      total?: BigNumber
    ) => {
      address = address.toLowerCase()
      if (address !== this.address) {
        this.characters[address] = {
          ...parseMinerLog(address, x, y, val, total),
          image: this.characters[address]
            ? this.characters[address].image
            : this.createImage(address),
        }
      }
    }
    this.contract.on('PlayerJoined', handleEvent)
    this.contract.on('PlayerMoved', handleEvent)
  }

  private async loadHistoricalData() {
    const playerJoinedFilter = {
      ...this.contract.filters.PlayerJoined(),
      fromBlock: '0x0',
      toBlock: 'latest',
    }
    const playerMovedFilter = {
      ...this.contract.filters.PlayerMoved(),
      fromBlock: '0x0',
      toBlock: 'latest',
    }
    const joinedLogs = await this.contract.provider.getLogs(playerJoinedFilter)
    const logs = joinedLogs.concat(
      await this.contract.provider.getLogs(playerMovedFilter)
    )
    logs.forEach((log) => {
      const { values } = this.contract.interface.parseLog(log)
      const userAddress = values[0].toLowerCase()
      if (userAddress !== this.address) {
        this.characters[userAddress] = {
          ...parseMinerLog(
            userAddress,
            values[1],
            values[2],
            values[3],
            values[4]
          ),
          image: this.createImage(userAddress),
        }
      }
    })
  }

  canMove(x: number, y: number) {
    return (
      !this.isMoving &&
      x >= 0 &&
      y >= 0 &&
      x < this.size &&
      y < this.size &&
      Math.abs(this.currentUser.x - x) + Math.abs(this.currentUser.y - y) === 1
    )
  }

  async callMove(direction: Direction) {
    this.isMoving = true
    await this.contract.move(direction)
    this.isMoving = false
  }
  async move(direction: Direction) {
    const { x, y } = this.currentUser
    try {
      if (direction === Direction.Down && this.canMove(x, y + 1)) {
        this.currentUser.y = y + 1
        await this.callMove(Direction.Down)
      } else if (direction === Direction.Up && this.canMove(x, y - 1)) {
        this.currentUser.y = y - 1
        await this.callMove(Direction.Up)
      } else if (direction === Direction.Left && this.canMove(x - 1, y)) {
        this.currentUser.x = x - 1
        await this.callMove(Direction.Left)
      } else if (direction === Direction.Right && this.canMove(x + 1, y)) {
        this.currentUser.x = x + 1
        await this.callMove(Direction.Right)
      }
    } catch (e) {
      this.isMoving = false
      this.currentUser.y = y
      this.currentUser.x = x
    }
  }
}
