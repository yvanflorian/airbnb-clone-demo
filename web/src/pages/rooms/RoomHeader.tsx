import { useContext } from "react"
import { RoomContext } from "./dataContext"
import { RoomTitle } from "./Room_01_Title"
import { RoomSubtitle } from "./Room_02_Subtitle"
import { RoomPhotos } from "./Room_03_Photos"
import { RoomHost } from "./Room_04_Host"
import { RoomAbout } from "./Room_05_About"
//mui-core
import Typography from "@material-ui/core/Typography"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Container from '@material-ui/core/Container'


const useStyles = makeStyles((theme: Theme) => createStyles({
   offset: theme.mixins.toolbar,
   cont: { backgroundColor: "#f7f7f7" },
}))


export const RoomLayoutAndContents = () => {
   const classes = useStyles()
   const { loading, error, data } = useContext(RoomContext)
   console.log(data)

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
            <RoomTitle text={loading ? "Loading..." : data?.oneListing.name || ""} />
            <RoomSubtitle
               reviewScoreRating={data?.oneListing.review_scores.review_scores_rating || 0}
               superhost={data?.oneListing.host.host_is_superhost || false}
               addressMarket={data?.oneListing.address.market || ""}
               addressCountry={data?.oneListing.address.country || ""}
               reviewsCount={data?.oneListing.number_of_reviews || 0}
               guestCount={data?.oneListing.guests_included || 0}
               bedroomCount={data?.oneListing.bedrooms || 0}
               bedCount={data?.oneListing.beds || 0}
            />
            <RoomPhotos
               pictureUrl={data?.oneListing.images.picture_url || ""}
            />
            <RoomHost
               host={data?.oneListing.host}
            />
            <RoomAbout
               hostname={data?.oneListing.host.host_name || ""}
               description={data?.oneListing.description || ""}
            />
         </Container>
      </div>

   if (loading) return isLoading
   if (error) return isError
   else return hasLoaded
}