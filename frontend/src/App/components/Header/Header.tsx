import React from 'react'
import {
  AppBar,
  Box,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { useWeb3Context } from '../../contexts/Web3Context/Web3Context'
import Blockie from '../Blockie/Blockie'

const useStyles = makeStyles<Theme, IHeaderProps>((theme: Theme) =>
  createStyles({
    container: {
      justifyContent: 'space-between',
    },
  })
)

interface IHeaderProps {}

export default React.memo(function Header(props: IHeaderProps) {
  const classes = useStyles(props)
  const { address, isValid } = useWeb3Context()

  return (
    <AppBar position={'relative'}>
      <Toolbar className={classes.container}>
        <Typography variant="h6" className={classes.title}>
          TT Miner
        </Typography>
        {address &&
          isValid && (
            <Box display={'flex'} alignItems={'center'}>
              <Box mr={1}>
                <Typography>
                  {address.slice(0, 10)}
                  ...
                </Typography>
              </Box>
              <Blockie
                address={address}
                height={24}
                width={24}
                color={'white'}
              />
            </Box>
          )}
      </Toolbar>
    </AppBar>
  )
})
