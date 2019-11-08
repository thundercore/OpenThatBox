import React, { ReactNode, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core'
import { useWeb3Context } from '../../contexts/Web3Context/Web3Context'
import { useMinerContractContext } from '../../contexts/MinerContractContext/MinerContractContext'

const useStyles = makeStyles<Theme, ILoginFormProps>((theme: Theme) =>
  createStyles({})
)

interface ILoginFormProps {
  children: ReactNode
}

export default React.memo(function LoginForm(props: ILoginFormProps) {
  const classes = useStyles(props)
  const { setCode, isValid, address } = useWeb3Context()
  const { contract, isLoading } = useMinerContractContext()
  const [code, setCodeVal] = useState('')

  const handleClick = () => {
    setCode(code)
  }
  const isLoggedIn = isValid && address && !!contract

  return !isLoggedIn ? (
    <Box
      display={'flex'}
      flexDirection={'column'}
      pt={8}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Box mb={2} width={400}>
        <TextField
          fullWidth
          error={!!address && !isValid}
          onChange={(evt) => setCodeVal(evt.target.value)}
          label={!!address && !isValid ? 'Invalid Code' : 'Code'}
        />
      </Box>
      <Button
        color="secondary"
        variant={'contained'}
        disabled={isLoading}
        onClick={handleClick}
      >
        Login
        {isLoading && (
          <Box ml={1} display={'inherit'}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Button>
    </Box>
  ) : (
    <div>{props.children}</div>
  )
})
