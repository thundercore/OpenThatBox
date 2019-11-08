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
import Button from '@material-ui/core/Button'

const useStyles = makeStyles<Theme, IHeaderProps>((theme: Theme) =>
  createStyles({
    container: {
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 22,
      fontFamily: 'Courier',
      fontWeight: 700,
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
          Open That Box
        </Typography>
        {address &&
          isValid && (
            <Button
              href={'https://scan.thundercore.com/address/' + address}
              target={'_blank'}
            >
              <Box display={'flex'} alignItems={'center'}>
                <Box mr={1}>
                  <Typography>{address}</Typography>
                </Box>
                <Blockie
                  spot
                  address={address}
                  height={24}
                  width={24}
                  color={'black'}
                />
              </Box>
            </Button>
          )}
      </Toolbar>
    </AppBar>
  )
})
