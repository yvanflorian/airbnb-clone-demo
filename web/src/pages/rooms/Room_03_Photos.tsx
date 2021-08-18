//mui-core
// import Typography from "@material-ui/core/Typography"

interface RoomPhotosProps {
   pictureUrl: string
}

export const RoomPhotos = (props: RoomPhotosProps) => {
   return (
      <div>
         <img
            src={props.pictureUrl}
            alt="listing main view"
         />
         <img
            src={props.pictureUrl}
            alt="listing Second view"
         />
      </div>
   )
}