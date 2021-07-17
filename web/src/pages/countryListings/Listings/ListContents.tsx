import { useContext } from "react"
import { IListing } from "./../../../types/Listing"
import { CountryListingContext } from "./../dataContext"
import ListingFilters from "./ListingFilters"
import ListingDescription from "./ListingDescription"
import ListingImage from "./ListingImage"
//mui-core
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Fab from '@material-ui/core/Fab'
//mui-icons
import MapIcon from '@material-ui/icons/Map'



const useStyles = makeStyles((theme: Theme) => createStyles({
   gridItem: {
      display: "flex",
      padding: theme.spacing(3),
      [theme.breakpoints.down("sm")]: {
         flexDirection: "column",
         alignItems: "stretch",
      },
      [theme.breakpoints.up("md")]: {
         borderBottom: "1px solid #DDDDDD !important"
      }
   },
   mapButton: {
      position: "fixed",
      left: "50%",
      zIndex: 10,
      [theme.breakpoints.down("sm")]: {
         bottom: "15%"
      },
      [theme.breakpoints.up("md")]: {
         bottom: "6%"
      },
      [theme.breakpoints.up("lg")]: {
         opacity: 0
      }
   }
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
            direction="column"
            alignItems="stretch"
         >
            <Grid item xs={12} className={classes.gridItem}>
               <ListingFilters
                  // staysInPlace={data?.countryListings[0].address.country}
                  staysInPlace={data?.countryListings.listing[0].address.country}
                  countStays={data?.countryListings.stays || ""}
                  roomTypes={data?.roomTypes}
               />
            </Grid>
            {loading && data !== null && data === undefined ?
               isLoading
               : data?.countryListings.listing.map((oneListing: IListing) => (
                  <Grid item xs={12}
                     className={classes.gridItem}
                     key={oneListing._id}
                  >
                     <ListingImage
                        listing={oneListing}
                     />
                     <ListingDescription
                        listing={oneListing}
                     />
                  </Grid>
               ))}
         </Grid>
         <Fab
            aria-label="add"
            color="default"
            className={classes.mapButton}
         >
            <MapIcon />
         </Fab>
      </div >


   if (loading) return isLoading
   if (error) return isError
   else return HasLoaded
}