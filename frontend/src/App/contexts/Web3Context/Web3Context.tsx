import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Signer, Wallet } from 'ethers'
import {
  JsonRpcProvider,
  Web3Provider as EthersProvider,
} from 'ethers/providers'
import { fromSeed } from 'ethers/utils/hdnode'
import {
  BigNumber,
  bigNumberify,
  parseEther,
  sha256,
  toUtf8Bytes,
} from 'ethers/utils'
import { sign } from 'crypto'

interface IWeb3ContextProps {
  children: ReactNode
  rpcUrl: string
}

export interface IWeb3Context {
  setCode(code: string): void
  sendAll(address: string): void
  signer?: Signer
  provider: JsonRpcProvider
  address: string
  isValid: boolean
}

const Web3Context = React.createContext<IWeb3Context>({
  setCode: (code: string) => {},
  sendAll: (address: string) => {},
  provider: new JsonRpcProvider(''),
  address: '',
  isValid: false,
  signer: undefined,
})

export default function Web3Provider({ children, rpcUrl }: IWeb3ContextProps) {
  const [provider] = useState(() => {
    const myProvider = new JsonRpcProvider(rpcUrl)
    myProvider.pollingInterval = 400
    return myProvider
  })
  const [signer, setSigner] = useState<Wallet | undefined>()
  const [isValid, setValid] = useState(true)

  const setCode = (code: string) => {
    const hdNode = fromSeed(
      sha256('0x' + toUtf8Bytes(code + 'thunder').join('') + 'thunder')
    )
    setSigner(new Wallet(hdNode).connect(provider))
  }

  useEffect(
    () => {
      if (signer) {
        setValid(true)
        signer.getBalance().then((val) => {
          setValid(val.gt(bigNumberify(0)))
        })
      }
    },
    [signer]
  )
  console.log(signer && signer.address)

  const sendAll = async (address: string) => {
    try {
      const balance = await signer!.getBalance()
      if (balance.lt(parseEther('0.001'))) {
        alert('TT has already been sent')
      } else {
        const trans = await signer!.sendTransaction({
          to: address,
          value: balance.sub(bigNumberify(parseEther('0.001'))),
        })

        await trans.wait()
        alert('Sent!')
      }
    } catch (e) {
      alert('Invalid Address or TT has already been sent')
    }
  }

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        isValid,
        address: signer ? signer.address.toLowerCase() : '',
        setCode,
        sendAll,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3Context = () => useContext(Web3Context)
