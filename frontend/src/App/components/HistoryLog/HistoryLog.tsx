import React from 'react'
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core'

const useStyles = makeStyles<Theme, IHistoryLogProps>((theme: Theme) => createStyles({}));

interface IHistoryLogProps {}

export default React.memo(function HistoryLog(props: IHistoryLogProps) {
  const classes = useStyles(props);
  return <div/>
})

