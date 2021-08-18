
//mui-core
import Typography from "@material-ui/core/Typography"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
//mui-icons
import StarIcon from "@material-ui/icons/Star"
import RoomIcon from "@material-ui/icons/Room"
import HomeIcon from "@material-ui/icons/Home"
import ScreenShareIcon from "@material-ui/icons/ScreenShare"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"

const useStyles = makeStyles((theme: Theme) => createStyles({
   subtitle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
   },
   side: {
      display: "flex",
      alignItems: "center"
   },
   separator: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
   },
   reviews: {
      textDecoration: "underline"
   }
}))

interface RoomSubtitleProps {
   reviewScoreRating: number,
   superhost: boolean,
   addressMarket: string,
   addressCountry: string,
   reviewsCount: number,
   guestCount: number,
   bedroomCount: number,
   bedCount: number,
}


const Separator = () => {
   const classes = useStyles()
   return (
      <Typography className={classes.separator}>.</Typography>
   )
}

export const RoomSubtitle = (props: RoomSubtitleProps): JSX.Element => {
   const classes = useStyles()
   return (
      <div className={classes.subtitle}>
         <div className={classes.side}>
            <IconButton size="small">
               <StarIcon />
            </IconButton>
            <Typography>
               {Math.round((Number(props.reviewScoreRating) * 0.05) * 100) / 100}
            </Typography>
            <Separator />
            <Typography className={classes.reviews}>
               {`${props.reviewsCount} reviews`}
            </Typography>
            <Separator />
            <Typography>
               {props.superhost ? "Superhost" : ""}
            </Typography>
            <IconButton size="small"><RoomIcon /></IconButton>
            <Typography>
               {props.addressMarket + "," + props.addressCountry}
            </Typography>
            <Separator />
            <IconButton size="small"><HomeIcon /></IconButton>
            <Typography>{`${props.guestCount} guests.${props.bedroomCount} bedroom.${props.bedCount} bed`}</Typography>
         </div>
         <div className={classes.side}>
            <IconButton size="small"><ScreenShareIcon /></IconButton>
            <Typography>Share</Typography>
            <IconButton size="small"><FavoriteBorderIcon /></IconButton>
            <Typography>Save</Typography>
         </div>
      </div>
   )
}