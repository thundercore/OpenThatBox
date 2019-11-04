import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Contract } from 'ethers'
import { abi } from './Miner.json'
import { useWeb3Context } from '../Web3Context/Web3Context'

interface IContractContextProps {
  children?: ReactNode
}

interface IContractContext {
  setContractAddress(address: string): any
  contract?: Contract
  isLoading: boolean
  error: boolean
}

const Context = React.createContext<IContractContext>({
  setContractAddress: (address) => {},
  isLoading: false,
  error: false,
})

export default function MinerContractProvider(props: IContractContextProps) {
  const [contract, setContract] = useState<Contract | undefined>()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [contractAddress, setContractAddress] = useState()

  const { signer, provider } = useWeb3Context()

  useEffect(
    () => {
      if (contractAddress) {
        setLoading(true)
        setError(false)
        try {
          const contract = new Contract(
            contractAddress,
            abi as any,
            signer || provider
          )
          contract
            .deployed()
            .then((contract) => {
              setLoading(false)
              setContract(contract)
            })
            .catch((a: any) => {
              console.log(a)
              setLoading(false)
              setError(true)
              setContract(undefined)
            })
        } catch (e) {
          debugger
          setLoading(false)
          setError(true)
          setContract(undefined)
        }
      }
    },
    [provider, signer, contractAddress]
  )

  return (
    <Context.Provider
      value={{ setContractAddress, contract, isLoading, error }}
    >
      {props.children}
    </Context.Provider>
  )
}

export const useMinerContractContext = () => useContext(Context)
