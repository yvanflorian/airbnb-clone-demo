
//mui-core
import LinearProgress, { LinearProgressProps } from "@material-ui/core/LinearProgress"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => createStyles({
   linear: {
      margin: "0 10px 0 10px"
   },
   color: {
      backgroundColor: theme.palette.common.white
   },
   barColor: {
      backgroundColor: theme.palette.common.black
   }
}))


export const MyLinearProgress = (props: LinearProgressProps): JSX.Element => {
   const classes = useStyles()

   return (
      <LinearProgress
         className={classes.linear}
         classes={{
            colorPrimary: classes.color,
            barColorPrimary: classes.barColor
         }}
         {...props}
      />
   )
}