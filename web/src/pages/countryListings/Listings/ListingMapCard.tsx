
import { IListing } from "./../../../types/Listing"
//mui-core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme: Theme) => createStyles({
   root: {
      display: "flex",
      flexDirection: "column"
   },
   imageContainer: {
      overflow: "hidden",
      [theme.breakpoints.up("sm")]: {
         minWidth: "200px",
         maxWidth: "200px",
         maxHeight: "150px",
         minHeight: "150px"
      },
      [theme.breakpoints.down("sm")]: {
         minHeight: "100%",
         minWidth: "100%",
         maxHeight: "100%",
         maxWidth: "100%"
      }
   },
   image: {
      height: "100%",
      width: "100%",
      backgroundColor: "#c5c5c5"
   },
   textcontainer: {
      width: "200px",
      display: "flex",
      flexDirection: "column"
   }
}))

interface ListingMapCardProps {
   data: IListing
}
/**
 * Map Element Card
 */
export const ListingMapCard = (props: ListingMapCardProps): JSX.Element => {
   const classes = useStyles()

   return (
      <div className={classes.root}>
         <div className={classes.imageContainer}>
            <img
               src={`${props.data.images.picture_url}`}
               alt="map-listing-pic"
               className={classes.image}
            />
         </div>
         <div className={classes.textcontainer}>
            <Typography variant="caption">{props.data.name}</Typography>
            <Typography variant="caption">{`$${props.data.price}/night`}</Typography>
         </div>
      </div>
   )
}