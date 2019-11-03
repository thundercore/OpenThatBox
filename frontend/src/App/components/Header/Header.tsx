import React, { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  createStyles,
  makeStyles,
  TextField,
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
  const { setCode, address } = useWeb3Context()
  const [code, setCodeVal] = useState('')

  const handleClick = () => {
    setCode(code)
  }

  return (
    <AppBar>
      <Toolbar className={classes.container}>
        <Typography variant="h6" className={classes.title}>
          TT Miner
        </Typography>
        {address ? (
          <Box display={'flex'} alignItems={'center'}>
            <Box mr={1}>
              <Typography>
                {address.slice(0, 10)}
                ...
              </Typography>
            </Box>
            <Blockie address={address} height={24} width={24} />
          </Box>
        ) : (
          <Box display={'flex'} alignItems={'center'}>
            <Box mr={1}>
              <TextField onChange={(evt) => setCodeVal(evt.target.value)} />
            </Box>
            <Button color="inherit" onClick={handleClick}>
              Login
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
})
