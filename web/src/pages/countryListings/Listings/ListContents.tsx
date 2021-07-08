import { useContext } from "react"
import { IListing } from "./../../../types/Listing"
import { CountryListingContext } from "./../dataContext"
//mui-core
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
// import Paper from "@material-ui/core/Paper"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
//mui-icons
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import StarIcon from '@material-ui/icons/Star'

const useStyles = makeStyles((theme: Theme) => createStyles({
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
   secondTextLine: {
      fontWeight: 600
   },
   thirdLineDivider: {
      borderTop: "1px solid #DDDDDD !important",
      width: "32px",
      padding: theme.spacing(1)
   },
   reviews: {
      display: "flex",
      alignItems: "center"
   },
   reviewStar: {
      padding: "0px"
   },
   reviewAmount: {
      fontWeight: 600,
      paddingRight: "4px"
   },
   reviewAmountText: {
      display: "flex",
   },
   reviewsPriceContainer: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
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
         <Grid
            container
            // spacing={3}
            direction="column"
            alignItems="stretch"
         >
            {loading ? isLoading : data?.countryListings.map((oneListing: IListing) => (
               // <Paper className={classes.paperGrid} elevation={2} key={oneListing._id} >
               <Grid item xs={12} className={classes.gridItem}>

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
                           <div>
                              <Typography
                                 variant="caption"
                              >
                                 {`Entire ${oneListing.property_type} in ${oneListing.address.suburb}`}
                              </Typography>
                              <Typography className={classes.secondTextLine} variant="subtitle2">{oneListing.name}</Typography>
                           </div>
                           <div>
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
                                 <Typography variant="subtitle2" className={classes.reviewAmount}>{Math.round((Number(oneListing.review_scores.review_scores_rating) * 0.05) * 100) / 100} </Typography>
                                 <Typography variant="caption">({oneListing.number_of_reviews} reviews)</Typography>
                              </div>
                              : null
                           }
                        </div>
                        <div className={classes.reviewAmountText}>
                           {/* <Typography variant="body2">$</Typography> */}
                           <Typography variant="subtitle2" className={classes.reviewAmount}>{`$${oneListing.price}`}</Typography>
                           <Typography variant="subtitle2"> / night</Typography>
                        </div>
                     </div>
                  </div>
               </Grid>
               // </Paper>
            ))}
         </Grid>
      </div >


   if (loading) return isLoading
   if (error) return isLoading
   else return HasLoaded
}