import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Web3Loader from '../Web3Loader/Web3Loader'
import Web3Provider from '../../contexts/Web3Context/Web3Context'
import { config } from '../../../config'
import Header from '../Header/Header'

const useStyles = makeStyles<Theme, IAppProps>((theme: Theme) =>
  createStyles({})
)

interface IAppProps {}

export default React.memo(function App(props: IAppProps) {
  const classes = useStyles(props)
  return (
    <Web3Provider rpcUrl={config.rpcUrl}>
      <Header />
    </Web3Provider>
  )
})
