import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Web3Provider from '../../contexts/Web3Context/Web3Context'
import { config } from '../../../config'
import Header from '../Header/Header'
import MinerContractProvider from '../../contexts/MinerContractContext/MinerContractContext'
import LoginForm from '../LoginForm/LoginForm'
import GameLoader from '../GameLoader/GameLoader'

const useStyles = makeStyles<Theme, IAppProps>((theme: Theme) =>
  createStyles({})
)

interface IAppProps {}

export default React.memo(function App(props: IAppProps) {
  const classes = useStyles(props)
  return (
    <Web3Provider
      rpcUrl={config.rpcUrl}
      // rpcUrl={'https://mainnet-rpc.thundercore.com'}
    >
      <MinerContractProvider
        contractAddress={config.contractAddress}
        // contractAddress={'0x81397badca91F6822454fe72bb9c8444CBb15F7e'}
      >
        <Header />
        <LoginForm>
          <GameLoader />
        </LoginForm>
      </MinerContractProvider>
    </Web3Provider>
  )
})
