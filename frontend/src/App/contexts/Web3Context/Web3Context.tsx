import React, { ReactNode, useContext, useState } from 'react'
import { Signer, Wallet } from 'ethers'
import {
  JsonRpcProvider,
  Web3Provider as EthersProvider,
} from 'ethers/providers'
import { fromSeed } from 'ethers/utils/hdnode'
import { sha256, toUtf8Bytes } from 'ethers/utils'

interface IWeb3ContextProps {
  children: ReactNode
  rpcUrl: string
}

export interface IWeb3Context {
  setCode(code: string): void
  signer?: Signer
  provider: JsonRpcProvider
  address: string
}

const Web3Context = React.createContext<IWeb3Context>({
  setCode: (code: string) => {},
  provider: new JsonRpcProvider(''),
  address: '',
  signer: undefined,
})

export default function Web3Provider({ children, rpcUrl }: IWeb3ContextProps) {
  const [provider] = useState(new JsonRpcProvider(rpcUrl))
  const [signer, setSigner] = useState<Wallet | undefined>()

  const setCode = (code: string) => {
    const hdNode = fromSeed(sha256('0x' + toUtf8Bytes(code).join('')))
    setSigner(new Wallet(hdNode).connect(provider))
  }

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        address: signer ? signer.address : '',
        setCode,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3Context = () => useContext(Web3Context)
