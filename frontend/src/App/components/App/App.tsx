import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Web3Provider from '../../contexts/Web3Context/Web3Context'
import { config } from '../../../config'
import Header from '../Header/Header'
import MinerContractProvider from '../../contexts/MinerContractContext/MinerContractContext'
import Game from '../Game/Game'

const useStyles = makeStyles<Theme, IAppProps>((theme: Theme) =>
  createStyles({})
)

interface IAppProps {}

export default React.memo(function App(props: IAppProps) {
  const classes = useStyles(props)
  return (
    <Web3Provider rpcUrl={config.rpcUrl}>
      <Header />
      <MinerContractProvider>
        <Game />
      </MinerContractProvider>
    </Web3Provider>
  )
})
