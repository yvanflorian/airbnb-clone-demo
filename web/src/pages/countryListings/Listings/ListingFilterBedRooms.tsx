import { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { CountryListingContext, useRouterQuery } from "../dataContext"
import { MyPopover } from "./../../../components/MyPopover"
import { useSimpleFilterButton, useKnobIconButton } from "../../../styles/Button"
import { useCardPopoverStyles } from "./../../../styles/Card"
import { useFilterDivider } from "./../../../styles/Divider"
//mui-core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import InputBase from '@material-ui/core/InputBase'
//mui-icons
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'


const useStyles = makeStyles((theme: Theme) => createStyles({
   line: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
   },
   knobRegion: {
      padding: theme.spacing(1)
   },
   knobIcon: {
      fontSize: "1.16071428571428572rem"
   },
   count: {
      margin: "0 15px 0 15px",
      maxWidth: "10px"
   },
   actions: {
      justifyContent: "space-between"
   },
}))

type tStateFrom = "beds" | "bedrooms" | "bathrooms"

export const ListingFilterBedRooms = (): JSX.Element => {
   //styles
   const classes = useStyles()
   const buttonStyles = useSimpleFilterButton()
   const iconButtonStyles = useKnobIconButton()
   const cardStyles = useCardPopoverStyles()
   const dividerStyles = useFilterDivider()

   //popover
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const id = open ? "BedRooms" : undefined

   //Context
   let history = useHistory()
   let query = useRouterQuery()
   const { filters, setFilters } = useContext(CountryListingContext)

   //states
   const [beds, setBeds] = useState<number>(filters?.query.beds?.gte || 0)
   const [bedrooms, setBedrooms] = useState<number>(filters?.query.bedrooms?.gte || 0)
   const [bathrooms, setBathrooms] = useState<number>(filters?.query.bathrooms?.gte || 0)

   //Popover
   const handleOpenPopOver = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget)
   }
   const handleClosePopOver = () => {
      setAnchorEl(null)
      handleSaveFilters()
   }

   //State
   const handleIncreaseCount = (from: tStateFrom) => {
      switch (from) {
         case "beds":
            setBeds(beds + 1)
            break
         case "bedrooms":
            setBedrooms(bedrooms + 1)
            break
         default:
            setBathrooms(bathrooms + 1)
            break
      }
   }
   const handleDecreaseCount = (from: tStateFrom) => {
      switch (from) {
         case "beds":
            setBeds(beds - 1)
            break
         case "bedrooms":
            setBedrooms(bedrooms - 1)
            break
         default:
            setBathrooms(bathrooms - 1)
            break
      }
   }
   const handleClearFilters = () => {
      setBeds(0)
      setBedrooms(0)
      setBathrooms(0)
   }
   //context & routing
   const handleSaveFilters = () => {
      if (filters !== null && filters !== undefined) {
         if (beds === 0 && bedrooms === 0 && bathrooms === 0) {
            setFilters({
               ...filters,
               query: {
                  country: filters.query.country,
               }
            })
            if (query.has("beds")) query.delete("beds")
            if (query.has("bedrooms")) query.delete("bedrooms")
            if (query.has("bathrooms")) query.delete("bathrooms")
            history.replace({
               search: query.toString()
            })
         } else {
            setFilters({
               ...filters,
               query: {
                  country: filters.query.country,
                  beds: { gte: beds },
                  bathrooms: { gte: bathrooms },
                  bedrooms: { gte: bedrooms }
               }
            })
            query.delete("beds")
            query.delete("bathrooms")
            query.delete("bedrooms")
            query.append("beds", beds.toString())
            query.append("bathrooms", bathrooms.toString())
            query.append("bedrooms", bedrooms.toString())
            history.replace({
               search: query.toString()
            })

         }
      }

   }

   return (
      <div>
         <Button
            variant="outlined"
            className={buttonStyles.root}
            onClick={handleOpenPopOver}
         >
            <Typography>Rooms and beds</Typography>
         </Button>
         <MyPopover
            id={id}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClosePopOver}
         >
            <Card className={cardStyles.root}>
               <CardContent>
                  <div className={classes.line}>
                     <Typography>Beds</Typography>
                     <div className={classes.knobRegion}>
                        <IconButton
                           size="small"
                           className={iconButtonStyles.root}
                           disabled={beds === 0}
                           onClick={() => handleDecreaseCount("beds")}
                        >
                           <RemoveIcon className={classes.knobIcon} />
                        </IconButton>
                        <InputBase
                           id="beds"
                           defaultValue={beds}
                           inputProps={{ "aria-label": "best" }}
                           className={classes.count}
                           value={beds}
                        />
                        <IconButton
                           size="small"
                           className={iconButtonStyles.root}
                           onClick={() => handleIncreaseCount("beds")}
                           disabled={beds >= 9}
                        >
                           <AddIcon className={classes.knobIcon} />
                        </IconButton>
                     </div>
                  </div>
                  <div className={classes.line}>
                     <Typography>Bedrooms</Typography>
                     <div className={classes.knobRegion}>
                        <IconButton
                           size="small"
                           className={iconButtonStyles.root}
                           disabled={bedrooms === 0}
                           onClick={() => handleDecreaseCount("bedrooms")}
                        >
                           <RemoveIcon className={classes.knobIcon} />
                        </IconButton>
                        <InputBase
                           id="bedrooms"
                           defaultValue={bedrooms}
                           inputProps={{ "aria-label": "bedrooms" }}
                           className={classes.count}
                           value={bedrooms}
                        />
                        <IconButton
                           size="small"
                           className={iconButtonStyles.root}
                           disabled={bedrooms >= 9}
                           onClick={() => handleIncreaseCount("bedrooms")}
                        >
                           <AddIcon className={classes.knobIcon} />
                        </IconButton>
                     </div>
                  </div>
                  <div className={classes.line}>
                     <Typography>Bathrooms</Typography>
                     <div className={classes.knobRegion}>
                        <IconButton
                           size="small"
                           className={iconButtonStyles.root}
                           disabled={bathrooms === 0}
                           onClick={() => handleDecreaseCount("bathrooms")}
                        >
                           <RemoveIcon className={classes.knobIcon} />
                        </IconButton>
                        <InputBase
                           id="baths"
                           defaultValue={bathrooms}
                           inputProps={{ "aria-label": "baths" }}
                           className={classes.count}
                           value={bathrooms}
                        />
                        <IconButton
                           size="small"
                           className={iconButtonStyles.root}
                           disabled={bathrooms >= 9}
                           onClick={() => handleIncreaseCount("bathrooms")}
                        >
                           <AddIcon className={classes.knobIcon} />
                        </IconButton>
                     </div>
                  </div>
               </CardContent>
               <Divider className={dividerStyles.root} />
               <CardActions className={classes.actions}>
                  <Button onClick={handleClearFilters}>Clear</Button>
                  <Button onClick={handleSaveFilters}>Save</Button>
               </CardActions>
            </Card>
         </MyPopover>

      </div>
   )
}