import { IListing } from "./../../../types/Listing"
//mui-core
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => createStyles({
   root: {
      borderRadius: "5%",
      overflow: "hidden",
      [theme.breakpoints.up("sm")]: {
         minHeight: "200px",
         minWidth: "300px",
         maxHeight: "200px",
         maxWidth: "300px",
      },
      [theme.breakpoints.down("sm")]: {
         minHeight: "100%",
         minWidth: "100%",
         maxHeight: "100%",
         maxWidth: "100%"
      }
   },
   imageListing: {
      height: "100%",
      width: "100%",
      backgroundColor: "#c5c5c5"
   },
}))

interface ListingImageProps {
   listing: IListing
}


export default function ListingImage(props: ListingImageProps) {
   const classes = useStyles()

   return (
      <div className={classes.root}>
         <img
            src={`${props.listing.images.picture_url}`}
            alt="country Flag"
            className={classes.imageListing}
         />
      </div>
   )
}