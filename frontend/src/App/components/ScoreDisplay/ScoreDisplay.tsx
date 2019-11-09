import React, { useEffect, useState } from 'react'
import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core'
import { GameService } from '../../service/GameService'
import Box from '@material-ui/core/Box'
import Blockie from '../Blockie/Blockie'
import Typography from '@material-ui/core/Typography'
//@ts-ignore
import AnimatedNumber from 'react-animated-number'
import { formatEther } from 'ethers/utils'
import { useWeb3Context } from '../../contexts/Web3Context/Web3Context'

const useStyles = makeStyles<Theme, IScoreDisplayProps>((theme: Theme) =>
  createStyles({
    scoreBox: {
      width: 250,
      padding: 8,
      borderRadius: 4,
      height: 50,
      position: 'absolute',
      left: 0,
      transition: theme.transitions.create('all'),
      border: '1px solid black  ',
    },
  })
)

interface IScoreDisplayProps {
  service: GameService
}

export default React.memo(function ScoreDisplay(props: IScoreDisplayProps) {
  const classes = useStyles(props)
  const { sendAll } = useWeb3Context()
  const [test, setState] = useState(1)
  const [address, setAddress] = useState('')

  useEffect(
    () => {
      props.service.stateUpdate.subscribe(() => {
        setState(Math.random())
      })
    },
    [props.service]
  )

  return (
    <div>
      {props.service.gameState == 0 && (
        <Typography>WAITING FOR PLAYERS</Typography>
      )}
      {props.service.gameState == 1 && <Typography>GAME STARTED</Typography>}
      {props.service.gameState == 2 && <Typography>GAME OVER</Typography>}
      <Box position={'relative'} mt={2}>
        {Object.values(props.service.characters)
          .sort((c1, c2) => (c2.total.gt(c1.total) ? 1 : -1))
          .slice(0, 10)
          .concat([props.service.currentUser])
          .sort((c1, c2) => (c2.total.gt(c1.total) ? 1 : -1))
          .map(({ address, total }, idx) => (
            <Box
              key={address}
              display={'flex'}
              alignItems={'center'}
              className={classes.scoreBox}
              style={{
                top: idx * 50,
              }}
            >
              <Box mr={2}>
                <Blockie
                  address={address}
                  color={'black'}
                  spot={address === props.service.currentUser.address}
                />
              </Box>
              <AnimatedNumber
                component={Typography}
                value={parseFloat(formatEther(total))}
                variant={'h6'}
                duration={500}
                stepPrecision={8}
              />
              <Box ml={1}>
                <Typography>
                  <b>TT</b>
                </Typography>
              </Box>
            </Box>
          ))}
      </Box>
      {props.service.gameState == 2 && (
        <Box
          display={'flex'}
          pt={8}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box mr={2} width={250}>
            <TextField
              fullWidth
              color={'inherit'}
              variant={'filled'}
              label={'Send To Address'}
              onChange={(evt) => setAddress(evt.target.value)}
            />
          </Box>
          <Button
            color="primary"
            variant={'contained'}
            onClick={() => sendAll(address)}
          >
            Send
          </Button>
        </Box>
      )}
    </div>
  )
})
