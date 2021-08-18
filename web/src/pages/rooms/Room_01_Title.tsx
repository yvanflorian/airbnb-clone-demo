
//mui-core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme: Theme) => createStyles({
   title: {
      padding: theme.spacing(2)
   }
}))

interface RoomTitleProps {
   text: string
}

export const RoomTitle = (props: RoomTitleProps): JSX.Element => {
   const classes = useStyles()
   return (
      <div className={classes.title}>
         <Typography variant="h5">
            {props.text}
         </Typography>
      </div>
   )
}

