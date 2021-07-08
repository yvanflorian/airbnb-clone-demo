import ListingContents from "./ListContents"
//mui-core
import Grid from "@material-ui/core/Grid"

export default function Listings() {
   const layout =
      <div>
         <Grid
            container
         >
            <Grid
               item
               md={6}
               xs={12}
            >
               <ListingContents />
            </Grid>
            <Grid
               item
               md={6}
               xs={6}
            >

            </Grid>
         </Grid>
      </div>
   return layout
}