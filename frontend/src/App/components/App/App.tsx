import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Web3Provider from '../../contexts/Web3Context/Web3Context'
import { config } from '../../../config'
import Header from '../Header/Header'
import GameContainer from '../../containers/GameContainer/GameContainer'
import GameProvider from '../../contexts/GameContext/GameContext'
import MinerContractProvider from '../../contexts/MinerContractContext/MinerContractContext'
import LoginForm from '../LoginForm/LoginForm'

const useStyles = makeStyles<Theme, IAppProps>((theme: Theme) =>
  createStyles({})
)

interface IAppProps {}

export default React.memo(function App(props: IAppProps) {
  const classes = useStyles(props)
  return (
    <Web3Provider rpcUrl={config.rpcUrl}>
      <MinerContractProvider>
        <Header />
        <LoginForm>
          <GameProvider>
            <GameContainer />
          </GameProvider>
        </LoginForm>
      </MinerContractProvider>
    </Web3Provider>
  )
})
