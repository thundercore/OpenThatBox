import { Contract } from 'ethers'
import { parseMinerLog } from '../utils/parseMinerLog'
//@ts-ignore
import * as blockies from 'blockies'

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

export class GameService {
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

  async initialize() {
    const [position, size, state] = await Promise.all([
      this.contract.playerPositions(this.address),
      this.contract.size(),
      this.contract.state(),
    ])
    this.size = size.toNumber()
    this.makeMap(this.size)

    this.currentUser = {
      image: blockies({
        seed: this.address,
        color: '#fff',
        bgcolor: '#00000000',
        size: 6,
        scale: 4,
        spotcolor: '#00000000',
      }).toDataURL(),
      address: position.address,
      x: position.x.toNumber(),
      y: position.y.toNumber(),
      total: position.total.toNumber(),
      initialized: position.initialized,
    }

    this.map[this.currentUser.x][this.currentUser.y] = position.address

    this.gameState = state
    await this.loadHistoricalData()
  }

  makeMap(size: number) {
    this.map = Array(size)
      .fill(Tile.Unmined)
      .map((x) => Array(size).fill(Tile.Unmined))
  }

  async loadHistoricalData() {
    const playerJoinedFilter = this.contract.filters.PlayerJoined()
    //@ts-ignore
    playerJoinedFilter.fromBlock = '0x0'
    //@ts-ignore
    playerJoinedFilter.toBlock = 'latest'

    // const logs = await this.contract.provider.getLogs(playerJoinedFilter)
    //   logs.forEach((log) => {
    //     const { values } = this.contract.interface.parseLog(log)
    //     const userAddress = values[0].toLowerCase()
    //     if (userAddress !== address) {
    //       newChars[address] = parseMinerLog(userAddress, values[1], values[2])
    //     }
    //   })
  }
}
