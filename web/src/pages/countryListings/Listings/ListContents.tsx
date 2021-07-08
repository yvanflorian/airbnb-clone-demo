import { useContext } from "react"
import { IListing } from "./../../../types/Listing"
import { CountryListingContext } from "./../dataContext"
//mui-core
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
//mui-icons
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import StarIcon from '@material-ui/icons/Star'

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
      paddingLeft: theme.spacing(3),
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
   },
   amenities: {
      display: "flex",
      listStyle: "none"
   },
   firstTextLineContainer: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between"
   },
   firstTextLine: {},
   firstTextLineIcon: {},
   secondTextLine: {
      fontWeight: 600
   },
   thirdLineDivider: {
      borderTop: "1px solid #DDDDDD !important",
      width: "32px",
      padding: theme.spacing(1)
   },
   reviews: {
      display: "flex"
   },
   reviewStar: {
      padding: "0px"
   },
   reviewsPriceContainer: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      // paddingTop: theme.spacing(3)
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
                  <Grid item xs={12} className={classes.gridItem} >
                     <div className={classes.imageListingContainer}>
                        <img
                           src={`${oneListing.images.picture_url}`}
                           alt="country Flag"
                           className={classes.imageListing}
                        />
                     </div>
                     <div className={classes.listingDescription}>
                        <div>
                           <div className={classes.firstTextLineContainer}>
                              <div className={classes.firstTextLine}>
                                 <Typography
                                    variant="caption"
                                 >
                                    {`Entire ${oneListing.property_type} in ${oneListing.address.suburb}`}
                                 </Typography>
                                 <Typography className={classes.secondTextLine} variant="subtitle2">{oneListing.name}</Typography>
                              </div>
                              <div className={classes.firstTextLineIcon}>
                                 <IconButton>
                                    <FavoriteBorderIcon />
                                 </IconButton>
                              </div>
                           </div>
                           <div className={classes.thirdLineDivider} />
                           <Typography variant="caption">{`${oneListing.guests_included} guests.${oneListing.bedrooms}bedroom.${oneListing.beds}bed`}</Typography>
                           <div className={classes.amenities}>
                              {oneListing.amenities.slice(0, 4).map((amenity, index) => (
                                 <li key={index}>
                                    <Typography key={index} variant="caption">{`${amenity}.`}</Typography>
                                 </li>
                              ))}
                           </div>
                        </div>
                        <div className={classes.reviewsPriceContainer}>
                           <div>

                              {oneListing.review_scores.review_scores_rating
                                 ?
                                 <div className={classes.reviews}>
                                    <IconButton color="primary" className={classes.reviewStar} size="small">
                                       <StarIcon />
                                    </IconButton>
                                    <Typography>{(Number(oneListing.review_scores.review_scores_rating) * 0.05)} ({oneListing.number_of_reviews} reviews) </Typography>
                                 </div>
                                 : null
                              }
                           </div>
                           <div>
                              <Typography>{`$${oneListing.price}/night`}</Typography>
                           </div>
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