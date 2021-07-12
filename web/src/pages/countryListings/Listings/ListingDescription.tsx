
import { IListing } from "./../../../types/Listing"
import useMediaQuery from '@material-ui/core/useMediaQuery'
//mui-core
import { makeStyles, createStyles, Theme, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
//mui-icons
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import StarIcon from '@material-ui/icons/Star'


const useStyles = makeStyles((theme: Theme) => createStyles({
   root: {
      paddingLeft: theme.spacing(3),
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
   },
   firstTextLineContainer: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between"
   },
   listingName: {
      fontWeight: 600
   },
   divider: {
      borderTop: "1px solid #DDDDDD !important",
      width: "32px",
      padding: theme.spacing(1)
   },
   amenities: {
      display: "flex",
      listStyle: "none"
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
   },
   reviewPriceMobile: {
      [theme.breakpoints.down("sm")]: {

      }
   },
}))

interface ListingDescriptionProps {
   listing: IListing
}
/**
 * Component holding the Text description
 * of each listing. It appears next to the listing 
 * picture
 */
export default function ListingDescription(props: ListingDescriptionProps) {
   const classes = useStyles()
   const theme = useTheme()
   const smallScreen: Boolean = useMediaQuery(theme.breakpoints.down("sm"))

   return (
      <div className={classes.root}>
         <div>
            <div className={classes.firstTextLineContainer}>
               <div>
                  <Typography
                     variant="caption"
                  >
                     {`Entire ${props.listing.property_type} in ${props.listing.address.suburb}`}
                  </Typography>
                  <Typography className={classes.listingName} variant="subtitle2">{props.listing.name}</Typography>
               </div>
               <div>
                  <IconButton>
                     <FavoriteBorderIcon />
                  </IconButton>
               </div>
            </div>
            <div className={classes.divider} />
            <Typography variant="caption">{`${props.listing.guests_included} guests.${props.listing.bedrooms}bedroom.${props.listing.beds}bed`}</Typography>
            <div className={classes.amenities}>
               {props.listing.amenities.slice(0, 4).map((amenity, index) => (
                  <li key={index}>
                     <Typography key={index} variant="caption">{`${amenity}.`}</Typography>
                  </li>
               ))}
            </div>
         </div>
         {smallScreen ?
            <div className={classes.reviewAmountText}>
               <Typography variant="subtitle2" className={classes.reviewAmount}>{`$${props.listing.price}`}</Typography>
               <Typography variant="subtitle2"> / night</Typography>
            </div>
            :
            <div className={classes.reviewsPriceContainer}>
               <div>
                  {props.listing.review_scores.review_scores_rating
                     ?
                     <div className={classes.reviews}>
                        <IconButton color="primary" className={classes.reviewStar} size="small">
                           <StarIcon />
                        </IconButton>
                        <Typography variant="subtitle2" className={classes.reviewAmount}>{Math.round((Number(props.listing.review_scores.review_scores_rating) * 0.05) * 100) / 100} </Typography>
                        <Typography variant="caption">({props.listing.number_of_reviews} reviews)</Typography>
                     </div>
                     : null
                  }
               </div>
               <div className={classes.reviewAmountText}>
                  <Typography variant="subtitle2" className={classes.reviewAmount}>{`$${props.listing.price}`}</Typography>
                  <Typography variant="subtitle2"> / night</Typography>
               </div>
            </div>
         }
      </div>
   )
}