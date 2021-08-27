import { RoomDivideMarker } from "./../../components/RoomDivideMarker"
import { AmenityIconMapper } from "./AmenityIconMapper"
//mui-core
import { makeStyles, createStyles, Theme } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme: Theme) => createStyles({
   root: {
      marginTop: theme.spacing(3),
      paddingBottom: theme.spacing(2)
   },
   description: {
      paddingTop: theme.spacing(2)
   },
   list: {
      columns: 2,
      listStyle: "none"
   },
   listItem: {
      display: "flex",
   },
   amenityText: {
      paddingLeft: theme.spacing(1)
   }
}))

interface RoomAmenitiesProps {
   amenities: [string]
}

export const RoomAmenities = (props: RoomAmenitiesProps): JSX.Element => {
   const classes = useStyles()

   return (
      <div>
         <Typography variant="h5">
            What this place offers
         </Typography>
         <div className={classes.description}>
            <ul className={classes.list}>
               {props.amenities.map((amenity => (
                  <li>
                     <div className={classes.listItem}>
                        <AmenityIconMapper amenity={amenity} />
                        <Typography
                           variant="subtitle1"
                           className={classes.amenityText}
                        >
                           {amenity}
                        </Typography>
                     </div>
                  </li>
               )))}
            </ul>
         </div>
         <RoomDivideMarker />
      </div>
   )
}