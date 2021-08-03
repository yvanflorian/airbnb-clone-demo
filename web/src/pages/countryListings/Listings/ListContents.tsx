import { useContext, useRef } from "react"
import { IListing } from "./../../../types/Listing"
import { CountryListingContext, useRouterQuery } from "./../dataContext"
import ListingFilters from "./ListingFilters"
import { ListingDescription, ListingTextSkeleton } from "./ListingDescription"
import { ListingImage, ListingImageSkeleton } from "./ListingImage"
import { ListingPagination } from "./ListingPagination"
import MyLink from "./../../../components/MyLink"
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
   },
}))

export default function ListingContents() {
   const classes = useStyles()
   const { error, data, loading } = useContext(CountryListingContext)
   const skeletonCount: React.MutableRefObject<number> = useRef(0)
   let query = useRouterQuery()
   let skeletonRender: number[] = []

   if (data) skeletonCount.current = data.countryListings.listing.length

   //push count of previously fetched vals for the skeleton loading
   if (loading) {
      for (let i = 0; i < skeletonCount.current; i++) {
         skeletonRender.push(i)
      }
   }
   let countryParam = query.get("country")

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
                  staysInPlace={query.has("mapselect") && Boolean(query.get("mapselect"))
                     ? "selected map area"
                     : countryParam !== null ? countryParam : data?.countryListings?.listing[0]?.address.country
                  }
                  countStays={data?.countryListings.stays || "0"}
                  roomTypes={data?.roomTypes}
               />
            </Grid>
            {loading ?
               skeletonRender.map((index) => (
                  <Grid item xs={12}
                     className={classes.gridItem}
                     key={index}
                  >
                     <ListingImageSkeleton />
                     <ListingTextSkeleton />
                  </Grid>
               ))
               : data?.countryListings.listing.map((oneListing: IListing) => (
                  <MyLink to={{
                     pathname: `${oneListing.listing_url}`
                  }}
                     target="_blank"
                     key={oneListing._id}
                  >
                     <Grid item xs={12}
                        className={classes.gridItem}
                     >
                        <ListingImage
                           listing={oneListing}
                        />
                        <ListingDescription
                           listing={oneListing}
                        />
                     </Grid>
                  </MyLink>
               ))}
            <Grid item xs={12}>
               <ListingPagination
                  stays={data?.countryListings.stays || "0"}
                  loading={loading}
               />
            </Grid>
         </Grid>
      </div >


   // if (loading) return isLoading
   if (error) return isError
   else return HasLoaded

}