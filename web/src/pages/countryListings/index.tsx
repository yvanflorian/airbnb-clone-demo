import AppBar from "./../../components/AppBar"
import { ListingBottomBar } from "./Listings/ListingBottomBar"
import Listings from "./Listings"
import { CountryListingProvider } from "./dataContext";

export default function CountryListings() {

   return (
      <CountryListingProvider>
         <AppBar
            barPosition={"fixed"}
         />
         <Listings />
         <ListingBottomBar />
      </CountryListingProvider>
   )
}