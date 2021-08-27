import { RoomDivideMarker } from "./../../components/RoomDivideMarker"
//mui-core
import { makeStyles, createStyles, Theme } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme: Theme) => createStyles({
   root: {
      marginTop: theme.spacing(3),
      paddingBottom: theme.spacing(2)
   },
   description: {
      paddingTop: theme.spacing(2)
   }
}))

interface RoomAboutProps {
   hostname: string,
   description: string
}
export const RoomAbout = (props: RoomAboutProps): JSX.Element => {
   const classes = useStyles()

   return (
      <div className={classes.root}>
         <Typography variant="h5">
            {`All about ${props.hostname}'s place`}
         </Typography>
         <div className={classes.description}>
            <Typography variant="subtitle1">
               {props.description}
            </Typography>
         </div>
         <RoomDivideMarker />
      </div>
   )
}