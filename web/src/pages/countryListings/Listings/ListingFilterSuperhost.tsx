import { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { useRouterQuery, CountryListingContext } from "../dataContext"
import { MyPopover } from "./../../../components/MyPopover"
import { MySwitch } from "./../../../components/MySwitch"
import { useCardPopoverStyles } from "./../../../styles/Card"
import { useFilterDivider } from "./../../../styles/Divider"
import { useSimpleFilterButton } from "../../../styles/Button"
//mui-core
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"

export const ListingFilterSuperhost = (): JSX.Element => {
   const buttonStyles = useSimpleFilterButton()
   const cardStyles = useCardPopoverStyles()
   const dividerStyles = useFilterDivider()
   //popover
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const id = open ? "SuperHost" : undefined
   //Filter context
   let history = useHistory()
   let query = useRouterQuery()
   const { filters, setFilters } = useContext(CountryListingContext)
   const [checked, setChecked] = useState<boolean>(filters?.query.is_superhost || false)



   const handleOpenPopOver = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget)
   }

   const handleSwitch = () => {
      checked ? setChecked(false) : setChecked(true)
   }

   const handleSaveFilters = () => {
      console.log("Saving Filters!!!")
      if (filters !== null && filters !== undefined) {
         switch (checked) {
            case false:
               setFilters({
                  ...filters,
                  query: {
                     ...filters.query,
                     is_superhost: undefined
                  }
               })
               if (query.has("page")) query.delete("page")
               if (query.has("superhost")) {
                  query.delete("superhost")
                  history.replace({
                     search: query.toString()
                  })
               }
               break;
            default:
               setFilters({
                  ...filters,
                  query: {
                     ...filters.query,
                     is_superhost: checked
                  }
               })
               if (query.has("page")) query.delete("page")
               query.delete("superhost")
               query.append("superhost", checked.toString())
               history.replace({
                  search: query.toString()
               })
               break;
         }
      }
      setAnchorEl(null)
   }

   const handleClosePopOver = () => {
      setAnchorEl(null)
      handleSaveFilters()
   }

   return (
      <div>
         <Button
            variant="outlined"
            onClick={handleOpenPopOver}
            className={query.has("superhost") ? buttonStyles.selected : buttonStyles.root}
         >
            <Typography>Super Host</Typography>
         </Button>
         <MyPopover
            id={id}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClosePopOver}
         >
            <Card className={cardStyles.root}>
               <CardContent>
                  <Typography variant="body2">Listings only from Airbnb Superhosts</Typography>

                  <MySwitch
                     checked={checked}
                     name="SuperHost"
                     color="default"
                     onChange={handleSwitch}
                  />
               </CardContent>
               <Divider className={dividerStyles.root} />
               <CardActions>
                  <Button onClick={handleSaveFilters}>Save</Button>
               </CardActions>
            </Card>
         </MyPopover>

      </div>
   )
}