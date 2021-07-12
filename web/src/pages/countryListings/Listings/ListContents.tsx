import { useContext } from "react"
import { IListing } from "./../../../types/Listing"
import { CountryListingContext } from "./../dataContext"
import ListingFilters from "./ListingFilters"
import ListingDescription from "./ListingDescription"
//mui-core
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme: Theme) => createStyles({
   gridContainer: {
      transition: theme.transitions.create("margin", {
         easing: theme.transitions.easing.easeOut,
         duration: theme.transitions.duration.enteringScreen
      }),
   },
   gridItem: {
      display: "flex",
      padding: theme.spacing(3),
      [theme.breakpoints.down("sm")]: {
         flexDirection: "column",
         alignItems: "stretch",
         padding: theme.spacing(2),
      },
      [theme.breakpoints.up("sm")]: {
         borderBottom: "1px solid #DDDDDD !important"
      }
   },
   paperGrid: {
      padding: theme.spacing(2),
   },
   imageListingContainer: {
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

export default function ListingContents() {
   const classes = useStyles()
   const { error, data, loading, fullMap } = useContext(CountryListingContext)

   console.log("Listings Requested", data, fullMap)

   const isLoading =
      <div>
         <Typography
            variant="body1"
         >
            Loading...
         </Typography>
      </div>
   const isError =
      <div>
         <Typography
            variant="body1"
         >
            Oups! Error...
         </Typography>
      </div>

   const HasLoaded =
      <div>
         <Grid
            container
            // spacing={3}
            direction="column"
            alignItems="stretch"
            className={classes.gridContainer}
         >
            <Grid item xs={12} className={classes.gridItem}>
               <ListingFilters
                  staysInPlace={data?.countryListings[0].address.country}
                  countStays={"20+"}
               />
            </Grid>
            {loading && data !== null && data === undefined ?
               isLoading
               : data?.countryListings.map((oneListing: IListing) => (
                  <Grid item xs={12} className={classes.gridItem} key={oneListing._id} >
                     {/* image */}
                     <div className={classes.imageListingContainer}>
                        <img
                           src={`${oneListing.images.picture_url}`}
                           alt="country Flag"
                           className={classes.imageListing}
                        />
                     </div>
                     {/* listingDescription */}
                     <ListingDescription
                        listing={oneListing}
                     />
                  </Grid>
               ))}
         </Grid>
      </div >


   if (loading) return isLoading
   if (error) return isError
   else return HasLoaded
}