import React from 'react'
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core'

const useStyles = makeStyles<Theme, IGameProps>((theme: Theme) => createStyles({}));

interface IGameProps {}

export default React.memo(function Game(props: IGameProps) {
  const classes = useStyles(props);
  return <div/>
})

