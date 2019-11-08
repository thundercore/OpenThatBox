import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { GameService } from '../../service/GameService'
import Box from '@material-ui/core/Box'
import Blockie from '../Blockie/Blockie'

const useStyles = makeStyles<Theme, IScoreDisplayProps>((theme: Theme) =>
  createStyles({})
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
      {Object.values(props.service.characters).map(({ address, total }) => (
        <Box key={address}>
          <Blockie address={address} color={'black'} />
          {total}
        </Box>
      ))}
    </div>
  )
})
