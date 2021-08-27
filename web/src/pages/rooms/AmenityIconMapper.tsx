
//mui-icon
import TvIcon from "@material-ui/icons/Tv"
import HttpIcon from '@material-ui/icons/Http'
import WifiIcon from '@material-ui/icons/Wifi'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import KitchenIcon from '@material-ui/icons/Kitchen'
import AccessibilityIcon from '@material-ui/icons/Accessibility'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService'
import SmokeFreeIcon from '@material-ui/icons/SmokeFree'
import ChildCareIcon from '@material-ui/icons/ChildCare'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import PoolIcon from '@material-ui/icons/Pool'
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast'

interface AmenityIconMapperProps {
   amenity: string
}

export const AmenityIconMapper = (props: AmenityIconMapperProps) => {

   const amenityList = [
      { item: "TV", icon: <TvIcon /> },
      { item: "Cable TV", icon: <TvIcon /> },
      { item: "Internet", icon: <HttpIcon /> },
      { item: "Wifi", icon: <WifiIcon /> },
      { item: "Air conditioning", icon: <AcUnitIcon /> },
      { item: "Kitchen", icon: <KitchenIcon /> },
      { item: "Doorman", icon: <AccessibilityIcon /> },
      { item: "Gym", icon: <FitnessCenterIcon /> },
      { item: "Elevator", icon: <ArrowUpwardIcon /> },
      { item: "Heating", icon: <TvIcon /> },
      { item: "Family/kid friendly", icon: <ChildCareIcon /> },
      { item: "Washer", icon: <LocalLaundryServiceIcon /> },
      { item: "Dryer", icon: <TvIcon /> },
      { item: "Smoke detector", icon: <SmokeFreeIcon /> },
      { item: "Carbon monoxide detector", icon: <SmokingRoomsIcon /> },
      { item: "Smoking allowed", icon: <SmokingRoomsIcon /> },
      { item: "First aid kit", icon: <LocalHospitalIcon /> },
      { item: "Fire extinguisher", icon: <TvIcon /> },
      { item: "Essentials", icon: <TvIcon /> },
      { item: "Shampoo", icon: <TvIcon /> },
      { item: "24-hour check-in", icon: <TvIcon /> },
      { item: "Hangers", icon: <TvIcon /> },
      { item: "Hair dryer", icon: <TvIcon /> },
      { item: "Iron", icon: <TvIcon /> },
      { item: "Pool", icon: <PoolIcon /> },
      { item: "Breakfast", icon: <FreeBreakfastIcon /> }
   ]
   let res = amenityList.filter(amenity => (amenity.item === props.amenity))
   return res.length === 0 ? <CheckBoxOutlineBlankIcon /> : res[0].icon
}