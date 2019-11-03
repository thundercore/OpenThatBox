import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Contract } from 'ethers'
import { abi } from './Miner.json'
import { useWeb3Context } from '../Web3Context/Web3Context'
import { JsonRpcProvider } from 'ethers/providers'

interface IContractContextProps {
  contractAddress?: string
  children?: ReactNode
}

interface IContractContext {
  contract?: Contract
  loading: boolean
  error: boolean
}

const Context = React.createContext<IContractContext>({
  loading: false,
  error: false,
})

export default function MinerContractProvider(props: IContractContextProps) {
  const [contract, setContract] = useState<Contract | undefined>()
  const { signer, provider } = useWeb3Context()

  useEffect(
    () => {
      if (props.contractAddress) {
        setContract(
          new Contract(props.contractAddress, abi as any, signer || provider)
        )
      }
    },
    [provider, signer, props.contractAddress]
  )

  return (
    <Context.Provider value={{ contract, loading: false, error: false }}>
      {props.children}
    </Context.Provider>
  )
}

export const useMinerContractContext = () => useContext(Context)
