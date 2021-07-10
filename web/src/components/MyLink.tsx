import { Link, LinkProps } from "react-router-dom"
//mui-core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => createStyles({
   mylinktext: {
      textDecoration: "none"
   }
}))
/**
 * Link custom Link Element that removes underlines 
 * from the child element
 * 
 * @param props 
 * @returns 
 */
export default function MyLink<S = unknown>(props: LinkProps<S> & React.RefAttributes<HTMLAnchorElement>): ReturnType<Link<S>> {
   const classes = useStyles()
   return (
      <Link
         className={classes.mylinktext}
         {...props}
      />
   )
}