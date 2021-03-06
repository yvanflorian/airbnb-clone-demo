import { useContext, useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import clsx from "clsx"
//mine
import { MapEvents, MapLoad } from "./MapEvents"
import { CountryListingContext } from "../dataContext"
import { IListing } from "../../../types/Listing"
import { MyLoadingButton } from "./../../../components/MyLoadingButton"
import { MapIcon } from "./../../../components/MapIcon"
import { ListingMapCard } from "./ListingMapCard"
//mui-core
import { makeStyles, Theme as AugmentedTheme, createStyles, useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
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
import CloseIcon from '@material-ui/icons/Close'


const useStyles = makeStyles((theme: AugmentedTheme) => createStyles({
   root: {
      position: "sticky",
      height: "100vh",
      //adding the height of the toolbar plus few pixels
      top: `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(1)}px)`
   },
   mapRegionLoading: {
      height: "100vh",
      padding: theme.spacing(2),
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      backgroundColor: "#e8e8e8",
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
      borderRadius: "8%"
   },
   showListButton: {
      textTransform: "none"
   },
   mapZoomCustomBtn: {
      padding: "3px 3px",
      borderRadius: "20%",
      boxShadow: "#0000001f 0px 6px 16px"
   },
   group: {
      height: theme.spacing(5)
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

interface IMapCenter {
   lat: number,
   lng: number
}


export default function ListingMapArea() {
   const classes = useStyles()
   const theme = useTheme()
   const smallScreen: Boolean = useMediaQuery(theme.breakpoints.down("md"))
   const { fullMap, setFullMap, data, loading } = useContext(CountryListingContext)
   const move: React.MutableRefObject<boolean> = useRef(true)
   const loadCount: React.MutableRefObject<number> = useRef(0)//to center the map only the first time!

   const [center, setCenter] = useState<IMapCenter | undefined>()
   const [searchMap, setSearchMap] = useState<boolean>(true)

   const [localData, setLocalData] = useState(data)

   if (data !== null && data !== undefined && center === undefined) {
      setCenter({
         lat: Number(data.countryListings.countryLocation.center_lat),
         lng: Number(data.countryListings.countryLocation.center_lng)
      })
   }

   //only reload markers once we successfully fetch a new set of data
   useEffect(() => {
      if (data) setLocalData(data)
   }, [setLocalData, data])



   const toggleFullMap = () => {
      fullMap ? setFullMap(false) : setFullMap(true)
   }

   const handleSearchMap = () => {
      searchMap ? setSearchMap(false) : setSearchMap(true)
   }


   return (
      <div className={classes.root}>
         <div className={classes.mapContainer}>
            {
               center !== null && center !== undefined ?
                  <MapContainer
                     center={center}
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
                                 startIcon={smallScreen ? <CloseIcon /> : <ChevronRightIcon />}
                                 onClick={toggleFullMap}
                              >
                                 {smallScreen ? null : <Typography variant="caption">Show List</Typography>}
                              </Button>
                              : <IconButton
                                 size="small"
                                 className={classes.fullmapButton}
                                 onClick={toggleFullMap}
                              >
                                 <ChevronLeftIcon />
                              </IconButton>
                        }
                        {
                           loading ?
                              <MyLoadingButton />
                              :
                              <FormControlLabel
                                 control={
                                    <Checkbox
                                       icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                       checkedIcon={<CheckBoxIcon fontSize="small" />}
                                       checked={searchMap}
                                       onChange={handleSearchMap}
                                       color="default"
                                    />
                                 }
                                 label={<Typography variant="caption"> Search as I move the map &nbsp;</Typography>}
                                 className={classes.fullmapButton}
                              />


                        }
                        <ButtonGroup
                           orientation="vertical"
                           aria-label="Custom Zoom controls"
                           classes={{
                              grouped: classes.group
                           }}
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
                     {localData?.countryListings.listing.map((oneListing: IListing) => (
                        <Marker position={[
                           oneListing.address.location.coordinates[1],
                           oneListing.address.location.coordinates[0]
                        ]} key={oneListing._id}
                           icon={MapIcon({ price: oneListing.price })}
                        >
                           <Popup
                           >
                              <ListingMapCard
                                 data={oneListing}
                              />
                           </Popup>
                        </Marker>
                     ))
                     }
                     <MapLoad moveTrigger={move} loads={loadCount} />
                     <MapEvents
                        moveTrigger={move}
                        loads={loadCount}
                        searchAsIMove={searchMap}
                     />
                  </MapContainer>
                  :
                  <div className={classes.mapRegionLoading}>
                     <MyLoadingButton />
                  </div>
            }
         </div>
      </div>
   )
}