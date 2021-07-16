import Popover, { PopoverProps } from "@material-ui/core/Popover"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"


const useStyles = makeStyles((theme: Theme) => createStyles({
   paperRoot: {
      borderRadius: "15px",
      border: "0.5px solid rgba(118, 118, 118, 0.28) !important",
      boxShadow: "none",
      marginTop: theme.spacing(1)
   },
   rootCard: {
      minWidth: "320px"
   },
}))

/**
 * Used for pop-overs coming after clicking the
 * filter buttons in the listings page 
 * @param props 
 * @returns 
 */
export const MyPopover = (props: PopoverProps): JSX.Element => {
   const classes = useStyles()
   return (
      <Popover
         anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
         }}
         transformOrigin={{
            vertical: "top",
            horizontal: "left"
         }}
         PaperProps={{
            classes: {
               root: classes.paperRoot
            }
         }}
         {...props}
      >
      </Popover>
   )
}