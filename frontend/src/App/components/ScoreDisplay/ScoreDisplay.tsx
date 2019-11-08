import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { GameService } from '../../service/GameService'
import Box from '@material-ui/core/Box'
import Blockie from '../Blockie/Blockie'
import Typography from '@material-ui/core/Typography'
//@ts-ignore
import AnimatedNumber from 'react-animated-number'

const useStyles = makeStyles<Theme, IScoreDisplayProps>((theme: Theme) =>
  createStyles({
    scoreBox: {
      width: 200,
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
  const [test, setState] = useState(1)

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
      {Object.values(props.service.characters)
        .sort((c1, c2) => c2.total - c1.total)
        .slice(0, 10)
        .concat([props.service.currentUser])
        .sort((c1, c2) => c2.total - c1.total)
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
              value={total}
              variant={'h6'}
              duration={500}
              stepPrecision={2}
            />
          </Box>
        ))}
    </div>
  )
})
