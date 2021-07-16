import { useContext } from "react"
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import L from "leaflet"
import clsx from "clsx"
import { CountryListingContext } from "./../dataContext"
import { IListing } from "../../../types/Listing"
//mui-core
import { makeStyles, Theme as AugmentedTheme, createStyles } from "@material-ui/core/styles"
// import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from "@material-ui/core/Button"
//mui-icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'


const useStyles = makeStyles((theme: AugmentedTheme) => createStyles({
   root: {
      position: "sticky",
      height: "100vh",
      //adding the height of the toolbar plus few pixels
      top: `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(1)}px)`
   },
   controlRegion: {
      padding: theme.spacing(2),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
   },
   enlargeMapRegion: {
      padding: theme.spacing(2),
   },
   fullmapButton: {
      backgroundColor: "#fff",
      zIndex: 10000,
      "&:hover": {
         backgroundColor: '#fff'
      },
      borderRadius: "unset !important"
   },
   showListButton: {
      textTransform: "none"
   },
   mapZoomCustomBtn: {
      padding: "3px 3px"
   },
   textPlaceHolder: {
      height: "100vh",
      weight: "100%",
      backgroundColor: "#e8e8e8",
   },
   mapContainer: {
      height: "100vh",
   },
   mapContent: {
      height: "100vh",
   },
   mapPrice: {
      fontWeight: 700
   }
}))


export default function MapArea() {
   const classes = useStyles()
   const { fullMap, setFullMap, data } = useContext(CountryListingContext)

   //fake marker
   const icon: L.DivIcon = L.divIcon({
      className: "custom",
      iconSize: [30, 30],
      iconAnchor: [0, 0],
      popupAnchor: [15, 0]
   })


   const toggleFullMap = () => {
      fullMap ? setFullMap(false) : setFullMap(true)
      console.log("Full Map now is:", fullMap)
   }

   return (
      <div className={classes.root}>
         <div className={classes.mapContainer}>
            {
               data !== null && data !== undefined ?
                  <MapContainer
                     center={[
                        data.countryListings.listing[0].address.location.coordinates[1],
                        data.countryListings.listing[0].address.location.coordinates[0]
                     ]}
                     zoom={13}
                     scrollWheelZoom={true}
                     className={classes.mapContent}
                     zoomControl={false}
                  >
                     <div className={classes.controlRegion}>
                        {
                           fullMap ?
                              <Button
                                 className={clsx(classes.fullmapButton, classes.showListButton)}
                                 size="small"
                                 startIcon={<ChevronRightIcon />}
                                 onClick={toggleFullMap}
                              >
                                 <Typography variant="caption">Show List</Typography>
                              </Button>
                              : <IconButton
                                 size="small"
                                 className={classes.fullmapButton}
                                 onClick={toggleFullMap}
                              >
                                 <ChevronLeftIcon />
                              </IconButton>
                        }
                        <FormControlLabel
                           control={
                              <Checkbox
                                 icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                 checkedIcon={<CheckBoxIcon fontSize="small" />}
                                 checked={true}
                                 color="default"
                              />
                           }
                           label={<Typography variant="caption">Search as I move the map &nbsp;</Typography>}
                           className={classes.fullmapButton}
                        />
                        <ButtonGroup
                           orientation="vertical"
                           aria-label="Custom Zoom controls"
                        >
                           <Button className={clsx(classes.fullmapButton, classes.mapZoomCustomBtn)} size="small">
                              <AddIcon />
                           </Button>
                           <Button className={clsx(classes.fullmapButton, classes.mapZoomCustomBtn)} size="small">
                              <RemoveIcon />
                           </Button>
                        </ButtonGroup>
                     </div>
                     <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     />
                     {data?.countryListings.listing.map((oneListing: IListing) => (
                        <Marker position={[
                           oneListing.address.location.coordinates[1],
                           oneListing.address.location.coordinates[0]
                        ]} key={oneListing._id}
                           icon={icon}
                        >
                           <Popup>
                              {oneListing.name}
                           </Popup>
                           <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
                              <Typography variant="caption" className={classes.mapPrice}>{`$${oneListing.price}`}</Typography>
                           </Tooltip>
                        </Marker>
                     ))
                     }
                  </MapContainer>
                  : <div className={classes.textPlaceHolder}>
                     <Typography>Loading...</Typography>
                  </div>
            }
         </div>
      </div>
   )
}