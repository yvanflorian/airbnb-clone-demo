import MyLink from "./MyLink"
import useMediaQuery from '@material-ui/core/useMediaQuery'

//mui-core
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles"
import AppBar, { AppBarProps } from "@material-ui/core/AppBar"
import Typography from "@material-ui/core/Typography"
import ToolBar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
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
      fontWeight: 700,
   },
   rightItems: {
      padding: theme.spacing(2)
   },
   search: {
      position: "relative",
      borderRadius: "40px",
      border: "1px solid #DDDDDD !important;",
      boxShadow: "0px 1px 2px rgb(0 0 0 / 8%), 0px 4px 12px rgb(0 0 0 / 5%)",
      // backgroundColor: fade(theme.palette.common.black, 0.15),
      // '&:hover': {
      //    backgroundColor: fade(theme.palette.common.black, 0.25),
      // },
      padding: theme.spacing(1),
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
   },
   linkAttribute: {
      textDecoration: "none"
   },
   searchButtons: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
   }
}))

interface AppbarProps {
   barPosition: AppBarProps["position"]
}

export default function Appbar(props: AppbarProps) {
   const classes = useStyles()
   const theme = useTheme()
   const smallScreen: Boolean = useMediaQuery(theme.breakpoints.down("md"))
   const mobile: Boolean = useMediaQuery(theme.breakpoints.down("sm"))

   const bar =
      <div className={classes.root}>
         <AppBar
            position={props.barPosition}
            className={classes.appBar}
         >
            <ToolBar className={classes.toolBarContents}>
               <MyLink to="/">
                  <div className={classes.logoName}>
                     <img className={classes.logoStyle} src="/favicon.png" alt="logo" />
                     {smallScreen ? null :
                        <Typography
                           variant="h6"
                           noWrap
                           color="primary"
                           className={classes.logoText}
                        >
                           airbnb
                        </Typography>
                     }
                  </div>
               </MyLink>
               <div className={classes.search}>
                  <ButtonGroup variant="text" aria-label="outlined primary button group">
                     <Button size="small" className={classes.searchButtons}>
                        <Typography variant="caption">Place</Typography>
                     </Button>
                     <Button size="small" className={classes.searchButtons}>
                        <Typography variant="caption">Add dates</Typography>
                     </Button>
                     <Button size="small" className={classes.searchButtons}>
                        <Typography variant="caption">Add guests</Typography>
                     </Button>
                  </ButtonGroup>
                  <IconButton size="small" color="primary" aria-label="upload picture">
                     <SearchIcon />
                  </IconButton>
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
   if (mobile) return <div></div>
   else return bar
}