import React, { useState } from 'react'
import {
  Box,
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core'
import { useWeb3Context } from '../../contexts/Web3Context/Web3Context'

const useStyles = makeStyles<Theme, IWeb3LoaderProps>((theme: Theme) =>
  createStyles({})
)

interface IWeb3LoaderProps {}

export default React.memo(function Web3Loader(props: IWeb3LoaderProps) {
  const classes = useStyles(props)
  const { setCode } = useWeb3Context()
  const [code, setCodeVal] = useState('')

  const handleClick = () => {
    setCode(code)
  }

  return (
    <div>
      <Box>
        <div>Please enter your code:</div>
        <TextField onChange={(evt) => setCodeVal(evt.target.value)} />
        <Button onClick={handleClick}>Save</Button>
      </Box>
    </div>
  )
})
