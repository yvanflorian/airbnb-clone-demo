import { useContext } from "react"
import { CountryListingContext } from "../dataContext"
import ListingContents from "./ListContents"
import MapArea from "./MapArea"
//mui-core
import Grid from "@material-ui/core/Grid"
import Slide from "@material-ui/core/Slide"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => createStyles({
   mapArea: {
      // backgroundColor: "#e8e8e8"
   }
}))
export default function Listings() {
   const classes = useStyles()
   const { fullMap } = useContext(CountryListingContext)

   const fullLayout =
      <div>
         <Grid
            container
         >
            <Grid
               item
               md={7}
               xs={12}
            >
               <ListingContents />
            </Grid>
            <Grid
               item
               md={5}
               xs={6}
               className={classes.mapArea}
            >
               <MapArea />
            </Grid>

         </Grid>
      </div>

   const mapOnly =
      <div>
         <Slide in={fullMap} direction="left" timeout={800}>
            <Grid
               container
               direction="row"
               alignItems="stretch"
               className={classes.mapArea}
            >
               <Grid
                  item
                  xs={12}
               >
                  <MapArea />
               </Grid>

            </Grid>

         </Slide>
      </div>

   return fullMap ? mapOnly : fullLayout
}