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
      // rpcUrl={config.rpcUrl}>
      rpcUrl={'http://localhost:8545'}
    >
      <MinerContractProvider
        contractAddress={'0xfA77B3CB8C7281B1039d4323dFDAa771008FbF0D'}
      >
        <Header />
        <LoginForm>
          <GameLoader />
          {/*<GameProvider>*/}
          {/*  <GameContainer />*/}
          {/*</GameProvider>*/}
        </LoginForm>
      </MinerContractProvider>
    </Web3Provider>
  )
})
