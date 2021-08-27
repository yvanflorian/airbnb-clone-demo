
//mui-core
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => createStyles({
   divider: {
      marginTop: theme.spacing(2),
      borderTop: "1px solid #DDDDDD !important",
      width: "100%",
   }
}))

export const RoomDivideMarker = (): JSX.Element => {
   const classes = useStyles()
   return (
      <div className={classes.divider} />
   )
}