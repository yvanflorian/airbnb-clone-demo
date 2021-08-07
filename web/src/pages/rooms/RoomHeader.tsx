import { useContext } from "react"
import { RoomContext } from "./dataContext"
//mui-core
import Typography from "@material-ui/core/Typography"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme: Theme) => createStyles({
   offset: theme.mixins.toolbar,
   cont: { backgroundColor: "#f7f7f7" },
   title: {
      padding: theme.spacing(2)
   }
}))

export const RoomHeader = () => {
   const classes = useStyles()
   const { loading, error, data } = useContext(RoomContext)

   const isLoading =
      <div>
         <Typography>Loading...</Typography>
      </div>

   const isError =
      <div>
         <Typography>Error...</Typography>
      </div>

   const hasLoaded =
      <div>
         <div className={classes.offset} />
         <Container maxWidth="lg" className={classes.cont}>
            <div className={classes.title}>
               {
                  loading ?
                     <Typography>Loading...</Typography>
                     :
                     <Typography variant="h5">
                        {data?.oneListing.name || ""}
                     </Typography>
               }

            </div>
         </Container>
      </div>

   if (loading) return isLoading
   if (error) return isError
   else return hasLoaded
}