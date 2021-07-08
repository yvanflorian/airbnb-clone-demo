import { useContext } from "react"
import { IListing } from "./../../../types/Listing"
import { CountryListingContext } from "./../dataContext"
//mui-core
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"


const useStyles = makeStyles((theme: Theme) => createStyles({
   gridItem: {
      // padding: theme.spacing(3),
      display: "flex",
      // flexDirection: "row",
      // alignContent: "flex-end"
   },
   paperGrid: {
      padding: theme.spacing(2)
   },
   imageListingContainer: {
      minHeight: "200px",
      minWidth: "300px",
      maxHeight: "200px",
      maxWidth: "300px",
      borderRadius: "5%",
      overflow: "hidden"
   },
   imageListing: {
      height: "100%",
      width: "100%",
      backgroundColor: "#c5c5c5"
   },
   listingDescription: {
      padding: theme.spacing(3),
      display: "flex",
      flexDirection: "column"
   },
   amenities: {
      display: "flex",
      listStyle: "none"
   },
   secondTextLine: {
      fontWeight: 600
   },
   reviewsPriceContainer: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between"
   }
}))

export default function ListingContents() {
   const classes = useStyles()
   const { error, data, loading } = useContext(CountryListingContext)

   console.log("Listings Requested", data)

   const isLoading =
      <div>
         <Typography
            variant="h4"
         >
            Loading
         </Typography>
      </div>

   const HasLoaded =
      <div>
         <Grid container
            spacing={1}
            direction="column"
            alignItems="stretch"
         >
            {loading ? isLoading : data?.countryListings.map((oneListing: IListing) => (
               <Paper className={classes.paperGrid} elevation={2} key={oneListing._id} >
                  <Grid item xs={6} className={classes.gridItem} >
                     <div className={classes.imageListingContainer}>
                        <img
                           src={`${oneListing.images.picture_url}`}
                           alt="country Flag"
                           className={classes.imageListing}
                        />
                     </div>
                     <div className={classes.listingDescription}>
                        <Typography
                           variant="caption"
                        >
                           {`Entire ${oneListing.property_type} in ${oneListing.address.suburb}`}
                        </Typography>
                        <Typography className={classes.secondTextLine} variant="subtitle2">{oneListing.name}</Typography>
                        <Typography>---</Typography>
                        <Typography variant="caption">{`${oneListing.guests_included} guests.${oneListing.bedrooms}bedroom.${oneListing.beds}bed`}</Typography>
                        <div className={classes.amenities}>
                           {oneListing.amenities.slice(0, 4).map((amenity, index) => (
                              <li key={index}>
                                 <Typography key={index} variant="caption">{`${amenity}.`}</Typography>
                              </li>
                           ))}
                        </div>
                        <div className={classes.reviewsPriceContainer}>
                           <Typography>{`$${oneListing.price}/night`}</Typography>
                           {oneListing.review_scores.review_scores_rating
                              ? <Typography>{(Number(oneListing.review_scores.review_scores_rating) * 0.05)} ({oneListing.number_of_reviews} reviews) </Typography>
                              : null}
                        </div>
                     </div>
                  </Grid>
               </Paper>
            ))}
         </Grid>
      </div >


   if (loading) return isLoading
   if (error) return isLoading
   else return HasLoaded
}