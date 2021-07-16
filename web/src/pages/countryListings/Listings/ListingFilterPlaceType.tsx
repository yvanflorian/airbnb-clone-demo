import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { CountryListingContext, useRouterQuery } from "./../dataContext"
import { useSimpleFilterButton } from "../../../styles/Button"
import { useCardPopoverStyles } from "./../../../styles/Card"
import { useFilterDivider } from "./../../../styles/Divider"
import { MyPopover } from "./../../../components/MyPopover"
//mui-core
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
// import Popper from "@material-ui/core/Popper"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Checkbox from "@material-ui/core/Checkbox"
import Divider from '@material-ui/core/Divider'

//mui-icons
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"

const useStyles = makeStyles((theme: Theme) => createStyles({
   divider: {
      opacity: 0.5
   },
   actions: {
      justifyContent: "space-between"
   },
   filterButton: {
      borderRadius: "30px !important",
   },
}))


interface PlaceTypeProps {
   rooms: string[]
}

/**
 * Type of Place Button + PopOver Menu Filter
 * @param props 
 * @returns 
 */
export const ListingFilterPlaceType = (props: PlaceTypeProps): JSX.Element => {
   const classes = useStyles()
   const buttonStyles = useSimpleFilterButton()
   const cardStyles = useCardPopoverStyles()
   const dividerStyles = useFilterDivider()
   //
   let history = useHistory()
   let query = useRouterQuery()
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const { filters, setFilters } = useContext(CountryListingContext)
   const [rooms, setRooms] = useState<string[]>(filters?.query.room_type?.in || [])


   const handleOpenPopOver = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget)
   }

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if ((rooms.indexOf(event.target.name) > -1)) {
         rooms.splice(rooms.indexOf(event.target.name), 1)
         setRooms([...rooms])
      }
      else {
         setRooms([...rooms, event.target.name])
      }
   }

   const handleSaveFilters = () => {
      console.log("Saving Filters!!!")
      if (filters !== null && filters !== undefined) {
         switch (rooms.length) {
            case 0:
               setFilters({
                  ...filters,
                  query: {
                     country: filters.query.country,
                  }
               })
               if (query.has("rooms")) {
                  query.delete("rooms")
                  history.replace({
                     search: query.toString()
                  })
               }
               break;
            default:
               setFilters({
                  ...filters,
                  query: {
                     country: filters.query.country,
                     room_type: { in: rooms }
                  }
               })
               query.delete("rooms")
               query.append("rooms", rooms.join("+"))
               history.replace({
                  search: query.toString()
               })
               break;
         }
      }
   }
   /**
    * Handle clicks away from the PopOver
    */
   const handleClose = () => {
      setAnchorEl(null)
      handleSaveFilters()
   };


   const handleClearFilters = () => {
      setRooms([])
   }

   const open = Boolean(anchorEl);
   const id = open ? "PlaceType" : undefined;

   return (
      <div>
         <Button
            variant="outlined"
            onClick={handleOpenPopOver}
            className={buttonStyles.root}
         >
            <Typography>Type of Place</Typography>
         </Button>
         <MyPopover
            id={id}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
         >
            <Card className={cardStyles.root}>
               <CardContent>
                  <FormControl component="fieldset" >
                     {props.rooms.map((roomtype, index) => (
                        <FormGroup key={index}>
                           <FormControlLabel
                              control={
                                 <Checkbox
                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                    color="default"
                                    name={roomtype}
                                    checked={rooms.indexOf(roomtype) >= 0}
                                    onChange={handleChange}
                                 />
                              }
                              label={<Typography variant="body1">{roomtype}</Typography>}
                           />
                        </FormGroup>
                     ))}
                  </FormControl>
               </CardContent>
               <Divider className={dividerStyles.root} />
               <CardActions className={classes.actions}>
                  <Button onClick={handleClearFilters}>Clear</Button>
                  <Button onClick={handleSaveFilters}>Save</Button>
               </CardActions>
            </Card>
            {/* <Typography>Content</Typography> */}
         </MyPopover>
      </div>

   )
}

