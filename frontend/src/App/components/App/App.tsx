import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Web3Provider from '../../contexts/Web3Context/Web3Context'
import { config } from '../../../config'
import Header from '../Header/Header'
import GameContainer from '../../containers/GameContainer/GameContainer'

const useStyles = makeStyles<Theme, IAppProps>((theme: Theme) =>
  createStyles({})
)

interface IAppProps {}

export default React.memo(function App(props: IAppProps) {
  const classes = useStyles(props)
  return (
    <Web3Provider rpcUrl={config.rpcUrl}>
      <Header />
      <GameContainer />
      {/*<MinerContractProvider>*/}
      {/*</MinerContractProvider>*/}
    </Web3Provider>
  )
})
