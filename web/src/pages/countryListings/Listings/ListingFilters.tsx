// import { useContext } from "react";
//mui-core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
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
}))

interface BeforeListItemsProps {
   staysInPlace?: string,
   countStays: string
}

/**
 * Component holding the Listing Filters
 * Appearing always as the first item of the list
 * picture
 */
export default function ListingFilters(props: BeforeListItemsProps) {
   const classes = useStyles()

   return (
      <div>
         <Typography variant="caption">{`${props.countStays} stays`}</Typography>
         <Typography variant="h5"> Stays in {props.staysInPlace}</Typography>
         <div className={classes.filterButtonsRegion}>
            <div className={classes.filterButtonsContainer}>
               <Button size="small" variant="outlined" className={classes.filterButton}>Prices</Button>
            </div>
            <div className={classes.filterButtonsContainer}>
               <Button size="small" variant="outlined" className={classes.filterButton}>Type of Place</Button>
            </div>
            <div className={classes.filterButtonsContainer}>
               <Button size="small" variant="outlined" className={classes.filterButton}>Instant Book</Button>
            </div>
            <div className={classes.filterButtonsContainer}>
               <Button size="small" variant="outlined" className={classes.filterButton}>More Filters</Button>
            </div>
         </div>
         <Typography variant="caption">Review COVID-19 travel restrictions before you book</Typography>
      </div>
   )
}