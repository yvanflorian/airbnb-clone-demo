
//mui-core
import { fade, makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Typography from "@material-ui/core/Typography"
import ToolBar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import InputBase from "@material-ui/core/InputBase"
//mui-icons
import LanguageIcon from '@material-ui/icons/Language'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme: Theme) => createStyles({
   root: {
      display: "flex",
   },
   appBar: {
      backgroundColor: theme.palette.common.white,
   },
   toolBarContents: {
      display: "flex",
      justifyContent: "space-around",
   },
   logoName: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
   },
   logoStyle: {
      width: "50px",
      height: "50px"
   },
   logoText: {
      fontWeight: 700
   },
   rightItems: {
      padding: theme.spacing(2)
   },
   search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.15),
      '&:hover': {
         backgroundColor: fade(theme.palette.common.black, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
         marginLeft: theme.spacing(3),
         width: 'auto',
      },
   },
   searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   inputRoot: {
      color: theme.palette.common.black,
   },
   inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
         width: '20ch',
      },
   },
   becomeHostText: {
      fontSize: theme.typography.caption.fontSize
   }
}))

export default function Appbar() {
   const classes = useStyles()

   return (
      <div className={classes.root}>
         <AppBar
            position="fixed"
            className={classes.appBar}
         >
            <ToolBar className={classes.toolBarContents}>
               <div className={classes.logoName}>
                  <img className={classes.logoStyle} src="/favicon.png" alt="logo" />
                  <Typography
                     variant="h6"
                     noWrap
                     color="primary"
                     className={classes.logoText}
                  >
                     airbnb
                  </Typography>
               </div>
               <div className={classes.search}>
                  <SearchIcon className={classes.searchIcon} />
                  <InputBase
                     placeholder="Start your search"
                     inputProps={{ 'aria-label': 'search' }}
                     classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                     }}
                  />
               </div>
               <div>
                  <IconButton size="small" className={classes.rightItems}>
                     <Typography variant="caption"> Become a Host</Typography>
                  </IconButton>
                  <IconButton aria-label="Select Language" size="small" className={classes.rightItems}>
                     <LanguageIcon />
                  </IconButton>
                  <IconButton size="small" className={classes.rightItems}>
                     <MenuIcon />
                     <AccountCircleIcon />
                  </IconButton>
               </div>
            </ToolBar>
         </AppBar>
      </div>
   )
}