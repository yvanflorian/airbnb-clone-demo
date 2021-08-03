
import { IListing } from "./../../../types/Listing"
import useMediaQuery from '@material-ui/core/useMediaQuery'
import clsx from "clsx"
//mui-core
import { makeStyles, createStyles, Theme, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
//mui-icons
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import StarIcon from '@material-ui/icons/Star'
//mui-labs
import Skeleton from "@material-ui/lab/Skeleton"


const useStyles = makeStyles((theme: Theme) => createStyles({
   root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      [theme.breakpoints.up("md")]: {
         paddingLeft: theme.spacing(3),

      }
   },
   firstTextLineContainer: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between"
   },
   textDescription: {
      display: "-webkit-box",
      boxOrient: "vertical",
      lineClamp: 1,
      textOverflow: "ellipsis",
      overflow: "hidden"
   },
   blackText: {
      color: "#000"
   },
   divider: {
      borderTop: "1px solid #DDDDDD !important",
      width: "32px",
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
      flexGrow: 1
   },
   reviewPriceMobile: {
      [theme.breakpoints.down("sm")]: {

      }
   },
   rootText: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: theme.spacing(2),
      width: "100%"
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
export const ListingDescription = (props: ListingDescriptionProps): JSX.Element => {
   const classes = useStyles()
   const theme = useTheme()
   const mobile: Boolean = useMediaQuery(theme.breakpoints.down("sm"))

   const smallscreen =
      <div className={classes.root}>
         {props.listing.review_scores.review_scores_rating ?
            <div className={classes.reviews}>
               <IconButton color="primary" className={classes.reviewStar} size="small">
                  <StarIcon />
               </IconButton>
               <Typography variant="subtitle2" className={classes.blackText}>{Math.round((Number(props.listing.review_scores.review_scores_rating) * 0.05) * 100) / 100} </Typography>
               <Typography variant="caption" className={classes.blackText}>({props.listing.number_of_reviews})</Typography>

            </div>
            :

            <Typography variant="subtitle2" className={classes.blackText}>No reviews yet </Typography>
         }
         <Typography
            variant="body2"
            className={classes.textDescription}
         >
            {`Entire ${props.listing.property_type} in ${props.listing.address.government_area}`}
         </Typography>
         <Typography variant="body2">{props.listing.name}</Typography>
         <div className={classes.reviewAmountText}>
            <Typography variant="subtitle2" className={classes.blackText}>{`$${props.listing.price} `}</Typography>
            <Typography variant="body2"> / night</Typography>
         </div>
      </div>

   const bigscreen =
      <div className={classes.root}>
         <div>
            <div className={classes.firstTextLineContainer}>
               <div>
                  <Typography
                     variant="body2"
                     className={classes.textDescription}
                  >
                     {`Entire ${props.listing.property_type} in ${props.listing.address.government_area}`}
                  </Typography>
                  <Typography
                     className={clsx(classes.blackText, classes.textDescription)}
                  >
                     {props.listing.name}
                  </Typography>
               </div>
               <div>
                  <IconButton>
                     <FavoriteBorderIcon />
                  </IconButton>
               </div>
            </div>
         </div>
         <div>
            {/* Guests and Amenities */}
            <div className={classes.divider} />
            <Typography variant="body2">{`${props.listing.guests_included} guests.${props.listing.bedrooms} bedroom.${props.listing.beds} bed`}</Typography>
            <div className={classes.amenities}>
               {props.listing.amenities.slice(0, 4).map((amenity, index) => (
                  <li key={index}>
                     <Typography key={index} variant="body2">{`${amenity}.`}</Typography>
                  </li>
               ))}
            </div>
         </div>
         <div className={classes.reviewsPriceContainer}>
            <div>
               {props.listing.review_scores.review_scores_rating
                  ?
                  <div className={classes.reviews}>
                     <IconButton color="primary" className={classes.reviewStar} size="small">
                        <StarIcon />
                     </IconButton>
                     <Typography
                        className={clsx(classes.reviewAmount, classes.blackText)}
                     >
                        {Math.round((Number(props.listing.review_scores.review_scores_rating) * 0.05) * 100) / 100}
                     </Typography>
                     <Typography variant="body2">({props.listing.number_of_reviews} reviews)</Typography>
                  </div>
                  : null
               }
            </div>
            <div className={classes.reviewAmountText}>
               <Typography className={clsx(classes.reviewAmount, classes.blackText)}>{`$${props.listing.price}`}</Typography>
               <Typography className={classes.blackText}> / night</Typography>
            </div>
         </div>
      </div>


   return mobile ? smallscreen : bigscreen
}

/**
 * Text Description Skeleton when loading the Page.
 * Next to the Listing Picture Skeleton
 * @returns Element
 */
export const ListingTextSkeleton = (): JSX.Element => {
   const classes = useStyles()

   return (
      <div className={classes.rootText}>
         <Skeleton variant="text" width="20%" />
         <Typography variant="h4">
            <Skeleton variant="text" width="80%" />
         </Typography>
         <div className={classes.divider} />
         <Skeleton variant="text" width="50%" />
         <Skeleton variant="text" width="40%" />
         <Typography variant="h5">
            <Skeleton variant="text" width="20%" />
         </Typography>
      </div>

   )

}