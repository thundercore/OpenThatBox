import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Contract } from 'ethers'
import { abi } from './Miner.json'
import { useWeb3Context } from '../Web3Context/Web3Context'

interface IContractContextProps {
  contractAddress?: string
  children?: ReactNode
}

interface IContractContext {
  contract?: Contract
  isLoading: boolean
  error: boolean
}

const Context = React.createContext<IContractContext>({
  isLoading: false,
  error: false,
})

export default function MinerContractProvider(props: IContractContextProps) {
  const [contract, setContract] = useState<Contract | undefined>()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { signer, provider } = useWeb3Context()

  useEffect(
    () => {
      if (props.contractAddress) {
        setLoading(true)
        setError(false)
        const contract = new Contract(
          props.contractAddress,
          abi as any,
          signer || provider
        )
        contract
          .deployed()
          .then((contract) => {
            setContract(contract)
            setLoading(false)
          })
          .catch(() => {
            setLoading(false)
            setError(true)
          })
      }
    },
    [provider, signer, props.contractAddress]
  )

  return (
    <Context.Provider value={{ contract, isLoading, error }}>
      {props.children}
    </Context.Provider>
  )
}

export const useMinerContractContext = () => useContext(Context)
