
//mui-core
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme: Theme) => createStyles({
   root: {
      marginTop: theme.spacing(3),
      paddingBottom: theme.spacing(2)
   }
}))

export const RoomBenefits = (): JSX.Element => {
   const classes = useStyles()

   return (
      <div className={classes.root}>
         <Typography variant="h5">
            Why you'll love it here
         </Typography>
      </div>
   )
}