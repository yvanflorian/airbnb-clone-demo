import MyLink from "./MyLink"
//mui-core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
//mui-icon
import GitHubIcon from '@material-ui/icons/GitHub'

const useStyles = makeStyles((theme: Theme) => createStyles({
   root: {
      padding: theme.spacing(2),
      display: "flex",
      justifyContent: "space-evenly",
      backgroundColor: "#f7f7f7",
      alignItems: "center"
   }
}))

export const Footer = (): JSX.Element => {
   const classes = useStyles()

   return (
      <div >
         <Divider />
         <div className={classes.root}>
            <Typography variant="caption">Remesha - 2021</Typography>
            <div>
               <MyLink
                  to={{
                     pathname: "https://github.com/yvanflorian/airbnb-clone-demo"
                  }}
                  target="_blank"
               >
                  <IconButton>
                     <GitHubIcon />
                  </IconButton>

               </MyLink>
               <Typography variant="caption">Raise a Github Issue</Typography>

            </div>
         </div>
      </div>
   )
}