import { IListing } from "./../../../types/Listing"
//mui-core
import { makeStyles, createStyles, Theme, useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
//mui-lab
import Skeleton from "@material-ui/lab/Skeleton"

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
   radius: {
      borderRadius: "5%"
   }
}))

interface ListingImageProps {
   listing: IListing
}


export const ListingImage = (props: ListingImageProps): JSX.Element => {
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


export const ListingImageSkeleton = (): JSX.Element => {
   const classes = useStyles()
   const theme = useTheme()
   const big = useMediaQuery(theme.breakpoints.up("sm"))

   return (
      <div>
         <Skeleton
            variant="rect"
            width={big ? 300 : "100%"}
            height={big ? 200 : "100%"}
            className={classes.radius}
         />
      </div>
   )
}