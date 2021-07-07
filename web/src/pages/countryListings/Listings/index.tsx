import { useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import { IListing } from "./../../../types/Listing"
//mui-core
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"


const useStyles = makeStyles((theme: Theme) => createStyles({
   gridItem: {
      // padding: theme.spacing(3),
      display: "flex",
   },
   paperGrid: {
      padding: theme.spacing(2)
   },
   imageListingContainer: {
      height: "200px",
      width: "300px",
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
      display: "flex"
   },
   secondTextLine: {
      fontWeight: 600
   }
}))

interface IURLParam {
   countryCode: string
}

const COUNTRY_LISTINGS_Q = gql`
   query countryListings($param: String!){
      countryListings(code: $param){
         images{
            picture_url
         }
         name
         guests_included
         bedrooms
         beds
         property_type
         address{
            country
            suburb
         }
         number_of_reviews
         amenities
         price
         review_scores{
            review_scores_rating
         }
      }
   }
`

export default function Listings() {
   const classes = useStyles()
   const match = useParams<IURLParam>()
   const { error, data, loading } = useQuery(COUNTRY_LISTINGS_Q, {
      variables: { param: match.countryCode }
   })
   console.log("Listings Requested", data)

   const isLoading =
      <div>
         <Typography
            variant="h4"
         >
            Loading
         </Typography>
      </div>

   const hasLoaded =
      <div>
         <Grid container
            spacing={1}
            direction="column"
            alignItems="stretch"
         >
            {loading ? isLoading : data?.countryListings.map((oneListing: IListing, index: React.Key) => (

               <Paper className={classes.paperGrid} elevation={2} key={index} >
                  <Grid item xs={12} className={classes.gridItem}>
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
                           {oneListing.amenities.slice(0, 4).map((amenity) => (
                              <Typography variant="caption">{`${amenity}.`}</Typography>
                           ))}
                        </div>
                        <Typography>{`$${oneListing.price}/night`}</Typography>
                        {oneListing.review_scores.review_scores_rating
                           ? <Typography>{(Number(oneListing.review_scores.review_scores_rating) * 0.05)} ({oneListing.number_of_reviews} reviews) </Typography>
                           : null}
                        <Typography>{ }</Typography>
                     </div>
                  </Grid>
               </Paper>
            ))}
         </Grid>
      </div >

   if (loading) return isLoading
   if (error) return isLoading
   else return hasLoaded
}