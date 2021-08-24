//mui-core
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles((theme: Theme) => createStyles({
   root: {
      height: "calc(60vh - 64px) !important",
      overflow: "hidden",
      borderRadius: theme.spacing(2),
      marginTop: theme.spacing(2)
   },
   gridContainer: {
      height: "100%"
   },
   image: {
      height: "100%",
      width: "100%",
      objectFit: "cover"
   },
   halfimg: {
      height: "50%",
      width: "100%",
      objectFit: "cover"
   }
}))
interface RoomPhotosProps {
   pictureUrl: string
}

export const RoomPhotos = (props: RoomPhotosProps) => {
   const classes = useStyles()

   return (
      <div className={classes.root}>
         <Grid
            container
            spacing={1}
            className={classes.gridContainer}
         >
            <Grid item xs={6}>
               <img
                  src={props.pictureUrl}
                  alt="listing main view"
                  className={classes.image}
               />
            </Grid>
            <Grid item xs={3}>
               <img
                  src={props.pictureUrl}
                  alt="listing Second view"
                  className={classes.halfimg}
               />
               <img
                  src={props.pictureUrl}
                  alt="listing Second view"
                  className={classes.halfimg}
               />
            </Grid>
            <Grid item xs={3}>
               <img
                  src={props.pictureUrl}
                  alt="listing Third view"
                  className={classes.halfimg}
               />
               <img
                  src={props.pictureUrl}
                  alt="listing Second view"
                  className={classes.halfimg}
               />
            </Grid>

         </Grid>
      </div>
   )
}