import { ListingFilterPlaceType } from "./ListingFilterPlaceType"
//mui-core
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"


const useStyles = makeStyles((theme: Theme) => createStyles({
   filterButtonsRegion: {
      display: "flex",
      paddingTop: theme.spacing(1)
   },
   filterButtonsContainer: {
      paddingRight: theme.spacing(2)
   },
   filterButton: {
      borderRadius: "30px !important",
   },
   regionSeparator: {
      paddingTop: theme.spacing(2)
   }
}))

interface BeforeListItemsProps {
   staysInPlace?: string,
   countStays: string,
   roomTypes?: string[]
}

/**
 * Component holding the Listing Filters
 * Appearing always as the first item of the list
 * picture
 */
export default function ListingFilters(props: BeforeListItemsProps) {
   const classes = useStyles()
   const theme = useTheme()
   const mobile: Boolean = useMediaQuery(theme.breakpoints.down("sm"))

   return (
      <div>
         <Typography variant="subtitle1">{`${props.countStays} stays`}</Typography>
         <Typography variant="h4"> Stays in {props.staysInPlace}</Typography>

         {mobile ?
            <div className={classes.filterButtonsRegion}>
               <div className={classes.filterButtonsContainer}>
                  <Button size="small" variant="outlined" className={classes.filterButton}>More Filters</Button>
               </div>
            </div>
            :
            <div className={classes.filterButtonsRegion}>
               <div className={classes.filterButtonsContainer}>
                  <Button variant="outlined" className={classes.filterButton}>Prices</Button>
               </div>
               <div className={classes.filterButtonsContainer}>
                  <Button variant="outlined" className={classes.filterButton}>Type of Place</Button>
               </div>
               <div className={classes.filterButtonsContainer}>
                  <ListingFilterPlaceType
                     rooms={props.roomTypes || []}
                  />
               </div>
               <div className={classes.filterButtonsContainer}>
                  <Button variant="outlined" className={classes.filterButton}>More Filters</Button>
               </div>
            </div>
         }
         <Typography className={classes.regionSeparator}>Review COVID-19 travel restrictions before you book</Typography>
      </div>
   )
}