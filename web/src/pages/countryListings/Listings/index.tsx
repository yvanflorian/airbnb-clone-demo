import { useContext } from "react"
import { CountryListingContext } from "../dataContext"
import ListingContents from "./ListContents"
import ListingMapArea from "./ListingMapArea"
import { MyHelmet } from "./../../../components/MyHelmet"
import { useRouterQuery } from "./../dataContext"
//mui-core
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Grid from "@material-ui/core/Grid"
import Slide from "@material-ui/core/Slide"
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles"
import Fab from '@material-ui/core/Fab'
//mui-icons
import MapIcon from '@material-ui/icons/Map'

const useStyles = makeStyles((theme: Theme) => createStyles({
   offset: theme.mixins.toolbar,
   mapButton: {
      position: "fixed",
      left: "50%",
      zIndex: 10,
      [theme.breakpoints.down("sm")]: {
         bottom: "15%"
      },
      [theme.breakpoints.up("md")]: {
         bottom: "6%"
      },
      [theme.breakpoints.up("lg")]: {
         opacity: 0
      }
   }
}))
export default function Listings() {
   const classes = useStyles()
   const { fullMap, setFullMap } = useContext(CountryListingContext)
   const theme = useTheme()
   const mobile: Boolean = useMediaQuery(theme.breakpoints.down("md"))
   let query = useRouterQuery()


   const makeFullMap = () => {
      setFullMap(true)
   }

   const fullLayout =
      <div>
         <MyHelmet title={`${query.get("country")}.Stays.Remesha Airbnb Clone`} description={`${query.get("country")} Place`} />
         <div className={classes.offset} />
         <Grid
            container
         >
            <Grid
               item
               lg={7}
               xs={12}
            >
               <ListingContents />
            </Grid>
            {mobile ? null
               :
               <Grid
                  item
                  lg={5}
                  xs={12}
               >
                  <ListingMapArea />
               </Grid>
            }
         </Grid>
         <Fab
            aria-label="add"
            color="default"
            className={classes.mapButton}
            onClick={makeFullMap}
         >
            <MapIcon />
         </Fab>
      </div>

   const mapOnly =
      <div>
         <MyHelmet title={`${query.get("country")}.Stays.Remesha Airbnb Demo`} description={`${query.get("country")} Place`} />
         <div className={classes.offset} />
         <Slide
            in={fullMap}
            direction={mobile ? "up" : "left"}
            timeout={mobile ? 10 : 800}
         >
            <Grid
               container
               direction="row"
               alignItems="stretch"
            >
               <Grid
                  item
                  xs={12}
               >
                  <ListingMapArea />
               </Grid>

            </Grid>

         </Slide>
      </div>

   return fullMap ? mapOnly : fullLayout
}