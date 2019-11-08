import { BigNumber } from 'ethers/utils'

export function parseMinerLog(
  address: string,
  x: BigNumber,
  y: BigNumber,
  value: BigNumber,
  total: BigNumber
) {
  return {
    address: address.toLowerCase(),
    x: x.toNumber(),
    y: y.toNumber(),
    total: total,
    initialized: true,
  }
}
