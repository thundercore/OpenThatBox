import React, { useEffect, useState } from 'react'
import {
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { useWeb3Context } from '../../contexts/Web3Context/Web3Context'
import { useMinerContractContext } from '../../contexts/MinerContractContext/MinerContractContext'
import CanvasGame from '../CanvasGame/CanvasGame'
import { GameService } from '../../service/GameService'
import Box from '@material-ui/core/Box'
import ScoreDisplay from '../ScoreDisplay/ScoreDisplay'

const useStyles = makeStyles<Theme, IGameLoaderProps>((theme: Theme) =>
  createStyles({})
)

interface IGameLoaderProps {}

export default React.memo(function GameLoader(props: IGameLoaderProps) {
  const contractContext = useMinerContractContext()
  const contract = contractContext.contract!
  const { address } = useWeb3Context()
  const [service] = useState(new GameService(contract, address))
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(
    () => {
      service
        .initialize()
        .then(() => setLoading(false))
        .catch((a) => {
          console.log(a)
          setError(true)
        })
    },
    [service]
  )

  if (error) {
    return <Typography>Please Refresh the Page and Try again</Typography>
  }
  return isLoading ? (
    <Box
      display={'flex'}
      alignItems={'center'}
      mt={10}
      justifyContent={'center'}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box
      display={'flex'}
      alignItems={'center'}
      mt={10}
      justifyContent={'center'}
    >
      <Box>
        <ScoreDisplay service={service} />
      </Box>
      <Box>
        <CanvasGame service={service} stop={false} />
      </Box>
    </Box>
  )
})
