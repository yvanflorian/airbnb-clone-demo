import { useContext } from "react"
import { IListing } from "./../../../types/Listing"
import { CountryListingContext, useRouterQuery } from "./../dataContext"
import ListingFilters from "./ListingFilters"
import ListingDescription from "./ListingDescription"
import ListingImage from "./ListingImage"
import { ListingPagination } from "./ListingPagination"
//mui-core
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

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
   }
}))

export default function ListingContents() {
   const classes = useStyles()
   const { error, data, loading } = useContext(CountryListingContext)
   let query = useRouterQuery()


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
                  staysInPlace={query.has("mapselect") && Boolean(query.get("mapselect")) ? "selected map area" : data?.countryListings?.listing[0]?.address.country}
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
            <Grid item xs={12}>
               <ListingPagination
                  stays={data?.countryListings.stays || "0"}
               />
            </Grid>
         </Grid>
      </div >


   if (loading) return isLoading
   if (error) return isError
   else return HasLoaded
}