
//mui-core
import { fade, makeStyles, Theme, createStyles} from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Typography from "@material-ui/core/Typography"
import ToolBar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import InputBase from "@material-ui/core/InputBase"
//mui-icons
import LanguageIcon from '@material-ui/icons/Language'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme: Theme)=>createStyles({
   root:{
      display: "flex",
   },
   appBar: {
      backgroundColor: theme.palette.common.white
   },
   toolBarContents:{
      display:"flex",
      justifyContent: "space-around",
      // marginLeft: theme.spacing(10)
   },
   logoName:{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      // padding: theme.spacing(2)
      // marginRight: theme.spacing(2)
   },
   logoStyle:{
      width:"50px",
      height: "50px"
   },
   rightItems:{
      display: "flex",
      alignItems: ""
   },
   search:{
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor:fade(theme.palette.common.black , 0.15),
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
}))

export default function Appbar(){
   const classes = useStyles()
   
   return(
      <div className={classes.root}>
         <AppBar
            position="static"
            className={classes.appBar}
         >
            <ToolBar className={classes.toolBarContents}>
               <div className={classes.logoName}>
                  <img className={classes.logoStyle} src="/favicon.png" alt="logo"/>
                  <Typography 
                     variant="h6"
                     noWrap
                     color="primary"
                  >
                     airbnb
                  </Typography>
               </div>
               <div className={classes.search}>
                  <SearchIcon className={classes.searchIcon}/>
                  <InputBase
                     placeholder="Start your search"
                     inputProps={{ 'aria-label': 'search' }}
                     classes={{
                       root: classes.inputRoot,
                       input: classes.inputInput,
                     }}
                  />
               </div>
               <div className={classes.rightItems}>
                  <Button size="small"> Become a Host</Button>
                  <IconButton aria-label="Select Language" >
                     <LanguageIcon/>
                  </IconButton>
                  <IconButton>
                     <MenuIcon/>
                     <AccountCircleIcon />
                  </IconButton>
               </div>
            </ToolBar>
         </AppBar>
      </div>
   )
}