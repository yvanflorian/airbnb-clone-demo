import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { CountryListingContext, useRouterQuery } from "./../dataContext"
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
import Popover from '@material-ui/core/Popover';

//mui-icons
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import { queryByTitle } from "@testing-library/react"

const useStyles = makeStyles((theme: Theme) => createStyles({
   rootCard: {
      minWidth: "320px",
      // borderRadius: "15px",
      // boxShadow: "inset -1px 0px 0px 0px rgb(0 0 0 / 20%), 0px 1px 20px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"

   },
   paperRoot: {
      borderRadius: "15px",
      border: "0.5px solid rgba(118, 118, 118, 0.28) !important",
      boxShadow: "none",
      marginTop: theme.spacing(1)
   },
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
   let history = useHistory()
   let query = useRouterQuery()
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const { filters, setFilters } = useContext(CountryListingContext)
   const [rooms, setRooms] = useState<string[]>(filters?.query.room_type?.in || [])


   const handleOpenPopOver = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget)
   }

   const handleClose = () => {
      setAnchorEl(null)
      console.log("clicked away...")
   };

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log("room", rooms)
      console.log("Event Target", event.target.name)
      console.log("room index", rooms.indexOf(event.target.name))

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
               history.push({
                  pathname: `/${filters?.query.country}`,
                  search: `rooms=${rooms}`
               })
               break;
         }
      }
   }

   const handleClearFilters = () => {
      setRooms([])
   }

   const open = Boolean(anchorEl);
   const id = open ? "PopOver" : undefined;

   console.log("Rooms", rooms)
   console.log("Filters:", filters)
   console.log("History", history)


   return (
      <div>
         <Button variant="outlined" className={classes.filterButton} onClick={handleOpenPopOver}>
            <Typography>Type of Place</Typography>
         </Button>
         <Popover
            id={id}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
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
         >
            <Card className={classes.rootCard}>
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
               <Divider className={classes.divider} />
               <CardActions className={classes.actions}>
                  <Button onClick={handleClearFilters}>Clear</Button>
                  <Button onClick={handleSaveFilters}>Save</Button>
               </CardActions>
            </Card>
            {/* <Typography>Content</Typography> */}
         </Popover>
      </div>

   )
}

