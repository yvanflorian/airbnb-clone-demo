//mui-core
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
//mui-icons
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) => createStyles({
   root: {
      top: 'auto',
      bottom: 0,
   },
   buttons: {
      display: "flex",
      justifyContent: "center"
   },
   oneBtn: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
   }
}))

/**
 * Bottom Fixed AppBar which will appear only 
 * on small screens
 * 
 * @returns JSX Element
 */
export const ListingBottomBar = (): JSX.Element => {
   const classes = useStyles()
   const theme = useTheme()
   const mobile: Boolean = useMediaQuery(theme.breakpoints.down("sm"))

   const bar =
      <AppBar
         position="fixed"
         color="inherit"
         className={classes.root}
      >
         <Toolbar className={classes.buttons}>
            <div className={classes.oneBtn}>
               <IconButton color="primary">
                  <SearchIcon />
               </IconButton>
               <Typography variant="caption">Explore</Typography>
            </div>
            <div className={classes.oneBtn}>
               <IconButton>
                  <FavoriteBorderIcon />
               </IconButton>
               <Typography variant="caption">Wishlists</Typography>
            </div>
            <div className={classes.oneBtn}>
               <IconButton>
                  <AccountCircleIcon />
               </IconButton>
               <Typography variant="caption">Login</Typography>
            </div>
         </Toolbar>
      </AppBar>

   if (mobile) return bar
   else return <div></div>
}