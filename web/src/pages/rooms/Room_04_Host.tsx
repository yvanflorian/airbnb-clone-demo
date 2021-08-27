import { IListing } from "./../../types/Listing"
import { RoomDivideMarker } from "./../../components/RoomDivideMarker"
//mui-core
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
// import Divider from "@material-ui/core/Divider"

const useStyles = makeStyles((theme: Theme) => createStyles({
   root: {
   },
   contents: {
      paddingTop: theme.spacing(4),
      display: "flex",
      alignItems: "center"
   },
   hostImageCtnr: {
      height: "112px",
      width: "88px",
   },
   hostImage: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      borderRadius: theme.spacing(1)
   },
   hostDescr: {
      paddingLeft: theme.spacing(2)
   },
}))

interface RoomHostProps {
   host?: IListing["host"]
}

export const RoomHost = (props: RoomHostProps): JSX.Element => {
   const classes = useStyles()

   return (
      <div className={classes.root}>
         <div className={classes.contents}>
            <div className={classes.hostImageCtnr}>
               <img
                  src={props.host?.host_picture_url}
                  alt="host profile"
                  className={classes.hostImage}
               />

            </div>
            <div className={classes.hostDescr}>
               <Typography variant="h5">
                  {` Meet the Host, ${props.host?.host_name}`}
               </Typography>
               <Typography variant="body2">
                  Hosting since ...
               </Typography>
            </div>
         </div>
         <RoomDivideMarker />
      </div>
   )
}