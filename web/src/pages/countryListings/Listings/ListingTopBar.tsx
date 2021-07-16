import { useContext } from "react"
import { CountryListingContext } from "./../dataContext"
import MyLink from "./../../../components/MyLink"
//mui-core
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme, makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Appbar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from "@material-ui/core/Button"
//mui-icons
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import FilterListIcon from '@material-ui/icons/FilterList'

const useStyles = makeStyles((theme: Theme) => createStyles({
   root: {

   },
   menu: {
      display: "flex",
      justifyContent: "space-between"
   },
   button1: {
      paddingRight: theme.spacing(2)
   },
   button2: {
      paddingLeft: theme.spacing(2),
   }
}))

/**
 * Return a mobile-friendly Top Bar
 * for Country Listings
 * 
 * @returns Top Bar
 */
export const ListingTopBar = (): JSX.Element => {
   const classes = useStyles()
   const theme = useTheme()
   const mobile: Boolean = useMediaQuery(theme.breakpoints.down("sm"))
   const { data } = useContext(CountryListingContext)

   const bar =
      <Appbar
         position="fixed"
         color="inherit"
         className={classes.root}
      >
         <Toolbar className={classes.menu}>
            <MyLink
               to="/"
            >
               <Button
                  size="small"
                  startIcon={<KeyboardArrowLeftIcon />}
               >
                  {data?.countryListings.listing[0].address.country}
               </Button>
            </MyLink>
            <ButtonGroup variant="text" >
               <Button size="small" className={classes.button1}> Add dates</Button>
               <IconButton>
                  <FilterListIcon />
               </IconButton>
            </ButtonGroup>
         </Toolbar>
      </Appbar>

   if (mobile) return bar
   else return <div></div>
}