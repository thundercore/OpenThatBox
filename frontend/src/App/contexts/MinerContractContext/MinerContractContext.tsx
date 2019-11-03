import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Contract } from 'ethers'
import { abi } from './Miner.json'
import { useWeb3Context } from '../Web3Context/Web3Context'
import { TextField, Button, CircularProgress, Box } from '@material-ui/core'

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
  const inputRef = useRef<HTMLInputElement>()

  const { signer, provider } = useWeb3Context()

  useEffect(
    () => {
      if (contractAddress) {
        setLoading(true)
        setError(false)
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
          .catch(() => {
            setLoading(false)
            setError(true)
            setContract(undefined)
          })
      }
    },
    [provider, signer, contractAddress]
  )

  const showContractForm = !contract && !isLoading
  const showGame = !!contract && !error

  const handleLoad = () => {
    if (inputRef.current) {
      setContractAddress(inputRef.current.value)
    }
  }

  return (
    <Context.Provider
      value={{ setContractAddress, contract, isLoading, error }}
    >
      {props.children}
      {/*{showContractForm && (*/}
      {/*  <Box p={4}>*/}
      {/*    <Box width={200}>*/}
      {/*      <TextField*/}
      {/*        fullWidth*/}
      {/*        inputRef={inputRef}*/}
      {/*        label={error ? 'Invalid ContractAddress' : 'Contract Address'}*/}
      {/*        error={error}*/}
      {/*      />*/}
      {/*    </Box>*/}
      {/*    <Button*/}
      {/*      onClick={handleLoad}*/}
      {/*      disabled={isLoading}*/}
      {/*      color={'primary'}*/}
      {/*      variant={'contained'}*/}
      {/*    >*/}
      {/*      Load*/}
      {/*    </Button>*/}
      {/*  </Box>*/}
      {/*)}*/}
      {/*{isLoading && <CircularProgress />}*/}
      {/*{showGame && }*/}
    </Context.Provider>
  )
}

export const useMinerContractContext = () => useContext(Context)
