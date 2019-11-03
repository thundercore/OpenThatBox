import React from 'react'
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core'

const useStyles = makeStyles<Theme, IGameMapProps>((theme: Theme) => createStyles({}));

interface IGameMapProps {}

export default React.memo(function GameMap(props: IGameMapProps) {
  const classes = useStyles(props);
  return <div/>
})

