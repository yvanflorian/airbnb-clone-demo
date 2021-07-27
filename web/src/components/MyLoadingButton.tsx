import { MyLinearProgress } from "./MyLinearProgress"
//mui-core
import Paper, { PaperProps } from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => createStyles({
   root: {
      minWidth: "50px",
      zIndex: 10000,
   },
   paper: {
      height: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      borderRadius: "20%"
   }
}))

/**
 * Button on the top region of the map
 * showing that the map is loading
 * 
 * @param props MUI-Paper Props
 * @returns 
 */
export const MyLoadingButton = (props: PaperProps): JSX.Element => {
   const classes = useStyles()
   return (
      <div className={classes.root}>
         <Paper
            className={classes.paper}
            {...props}
         >
            <MyLinearProgress />
         </Paper>
      </div>
   )
}