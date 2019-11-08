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
      // rpcUrl={'https://rpc.platform.dev.tt-eng.com'}
    >
      <MinerContractProvider
        contractAddress={config.contractAddress}
        // contractAddress={'0x13eEc053BAa2eE73E8F198BB457aC0e48817cC79'}
      >
        <Header />
        <LoginForm>
          <GameLoader />
        </LoginForm>
      </MinerContractProvider>
    </Web3Provider>
  )
})
