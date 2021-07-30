import { renderToString } from "react-dom/server"
import L from "leaflet"
//mui-core
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import {withStyles } from "@material-ui/core/styles"

interface MapIconProps{
   price: number
}


const StyledTypography = withStyles({
   caption: {
      fontWeight: 700,
      padding: "2px"
   }
 })(Typography);


export const MapIcon = ( props: MapIconProps) : L.DivIcon => {

   const iconContent: JSX.Element =
   <Paper>
      <StyledTypography 
         variant="caption"
      >
         {`$${props.price}`} 
      </StyledTypography>
   </Paper>

   const iconOptions: L.DivIconOptions = {
      className: "App-Map-MarkerIcon",
      iconAnchor: [0,0],
      popupAnchor: [15,0],
      html: renderToString(iconContent)
   }
   props.price > 99 ? iconOptions.iconSize = [35,35] : iconOptions.iconSize = [30,30]
   
   //Size depending on the Price
   if (props.price > 99) iconOptions.iconSize = [30,30]
   if (props.price > 99 && props.price <1000) iconOptions.iconSize = [35,35]
   if (props.price > 999 && props.price <10000) iconOptions.iconSize = [40,40]
   if (props.price > 9999) iconOptions.iconSize = [50,50]
   

   const ret: L.DivIcon = L.divIcon(iconOptions)

   return ret 
} 